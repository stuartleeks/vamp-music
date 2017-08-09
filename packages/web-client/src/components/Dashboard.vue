<template>
  <div class="container content">
    <div class="row">
      <div class="col-sm-12">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-9 text-left">
        <h3 class="header">Recommended tracks</h3>
        <spinner v-if="songs.length === 0"></spinner>
        <table class="text-left table table-striped" v-else>
          <thead>
          <tr>
            <th width="50px"></th>
            <th width="40%">Title</th>
            <th width="40%">Artist</th>
            <th>Tags</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(song, index) in songs" :key="song.track_id">
            <td class="data-button">
              <span class="icon play-button" @click="togglePlay(song.track_id)" :class="song.playing ? 'icon-music-pause-button' : 'icon-music-play-button'"></span>
            </td>
            <td>
              {{song.title}}
            </td>
            <td>
              <router-link :to="{ path: '/app/browse', query: { artist: song.artist }}">{{song.artist}}</router-link>
            </td>
            <td>
              <div class="song-tags-wrapper">
                <router-link v-for="tag in limitTags(song.tags)" :key="tag[0]" class="badge badge-default badge-info song-tag" :to="{ path: '/app/browse', query: { tag: tag[0] }}">
                  {{tag[0]}}
                </router-link>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-3 text-left">
        <h4 class="header">Friend activity</h4>
        <spinner v-if="activity.length === 0"></spinner>
        <div class="activity" v-else>
          <div class="activity-event" v-for="event in activity">
            <div class="activity-event-left">
              <img class="activity-avatar" :src="event.user.avatar" alt="" width="30px" height="30px">
            </div>
            <div class="activity-event-content">
              {{event.user.firstName}} {{event.user.lastName}}
              <div class="activity-timestamp">
                {{event.timestamp | fromNow}}
              </div>
              <div v-if="event.event === 'songs:play'">
                {{event.song.title}}
                <router-link class="activity-link" :to="{ path: '/app/browse', query: { artist: event.song.artist }}">{{event.song.artist}}</router-link>
              </div>
              <div v-if="event.event ==='login'">
                Logged in!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Spinner from './Spinner'

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%ds',
    ss: '%ss',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dM',
    y: 'a year',
    yy: '%dY'
  }
})

export default {
  name: 'dashboard',
  components: {
    spinner: Spinner
  },
  mounted () {
    this.fetchData()
  },
  computed: {
    currentTrack () {
      return this.$store.getters.currentTrack
    },
    songs () {
      return this.$store.getters.songs
    },
    activity () {
      return this.$store.getters.activity
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getProfile')
      this.$store.dispatch('getRecommendedSongs')
      this.$store.dispatch('getActivity')
    },
    togglePlay (index) {
      this.$store.dispatch('togglePlay', index)
    },
    limitTags (tags) {
      return tags.slice(0, 3)
    }
  },
  filters: {
    fromNow: (iso) => {
      return moment(iso).fromNow(true)
    }
  }
}
</script>
<style scoped>
  .data-button {
    padding-top: .6em;
    padding-bottom: .1em;
  }

  .play-button {
    font-size: 1.5em;
  }

  .activity {
    font-size: .9em;
    padding: 0 1em;
  }

  .activity-event {
    position: relative;
    margin-bottom: 1em;
  }

  .activity-link {
    display: block;
  }

  .activity-event-left {
    float: left;
    margin-bottom: 2em;
  }


  .activity-avatar {
    border-radius: 50%;
  }

  .activity-timestamp {
    float: right;
    color: gray;
  }

  .activity-event-content {
    margin-left: 3em;
    padding-left: 1em;
    padding-bottom: 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
