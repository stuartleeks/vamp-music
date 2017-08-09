const config = require('config')
const axios = require('axios')
const analytics = config.services.analytics
const songs = config.services.songs
const profile = config.services.profile

const routes = [
  {
    method: 'GET',
    path: '/{email}',
    config: {
      handler: find
    }
  }
]

function find (request, reply) {
  const email = request.params.email
  axios.get(`http://${analytics.host}:${analytics.port}/events`)
    .then(res => {
      const songPromises = []
      const profilePromises = []
      const rawEvents = res.data.filter(event => event.user !== email)
      const activities = []
      rawEvents.forEach(item => {
        // always fetch the user
        const email = item.user
        profilePromises.push(axios.get(`http://${profile.host}:${profile.port}/${email}`))

        // fetch the song if needed
        if (item.event === 'songs:play') {
          const trackId = item.payload.trackId
          songPromises.push(axios.get(`http://${songs.host}:${songs.port}/${trackId}`))
        } else {
          songPromises.push(Promise.resolve())
        }
      })

      Promise.all(profilePromises)
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            const activity = {
              event: rawEvents[i].event,
              user: {
                firstName: res[i].data.first_name,
                lastName: res[i].data.last_name,
                avatar: res[i].data.avatar
              },
              timestamp: rawEvents[i].timestamp
            }
            activities.push(activity)
          }
          return Promise.all(songPromises)
        })
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            // there is a song result
            if (res[i]) {
              activities[i].song = {
                artist: res[i].data.artist,
                title: res[i].data.title
              }
            }
          }
          reply(activities)
        })
        .catch(err =>{
        reply(err)
      })
      .catch(err => {
        reply(err)
      })
    })
}

function fetchSong () {

}

function fetchProfile () {

}

exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'recommended'
}
