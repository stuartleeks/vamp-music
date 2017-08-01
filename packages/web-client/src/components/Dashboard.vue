<template>
  <div class="container content">
    <div class="row">
      <div class="col-sm-12">
        <div class="alert alert-info" v-if="error">
          {{error.status}}
          {{error.statusText}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 text-left">
        <h3 class="header">{{header}}</h3>
        <a @click="goHome()" v-if="showHomeLink" class="mb-3 d-block">Back to dashboard</a>
        <table class="text-left table table-striped">
          <thead>
          <tr>
            <th width="50px"></th>
            <th width="40%">Title</th>
            <th width="40%">Artist</th>
            <th>Tags</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(song, index) in songs" :key="song._id">
            <td>
              <span class="icon play-button" @click="togglePlay(index)" :class="song.playing ? 'icon-music-pause-button' : 'icon-music-play-button'"></span>
            </td>
            <td>
              {{song.title}}
            </td>
            <td>
              <a @click="getSongsByArtist(song.artist)">{{song.artist}}</a>
            </td>
            <td>
              <div class="song-tags-wrapper">
                <div v-for="tag in limitTags(song.tags)" class="badge badge-default badge-info song-tag" @click="getSongsByTag(tag[0])">
                  {{tag[0]}}
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--<div class="col-sm-6">-->
        <!--<h2 class="header">Charts</h2>-->
        <!--<table>-->
          <!---->
        <!--</table>-->
        <!--<ul>-->
          <!--<li v-for="(value, key) in charts">-->
            <!--<h3>{{key}}</h3>-->
            <!--<ul>-->
              <!--<li v-for="entry in value">{{entry}}</li>-->
            <!--</ul>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
    <div class="row">

    </div>
    <playbar :playing="globalPlaying" :artist="globalArtist" :title="globalTitle"></playbar>
  </div>
</template>

<script>
import http from '../services/http'
import Vue from 'Vue'
import Playbar from './Playbar.vue'
export default {
  name: 'dashboard',
  components: {
    Playbar
  },
  data () {
    return {
      header: 'Recommended tracks',
      showHomeLink: false,
      error: '',
      charts: [],
      songs: [],
      globalPlaying: false,
      globalTitle: '...',
      globalArtist: '...'
    }
  },
  mounted () {
    this.getRecommendSongs()
  },
  methods: {
    goHome () {
      this.getRecommendSongs()
      this.header = 'Recommended tracks'
      this.showHomeLink = false
    },
    getRecommendSongs () {
      http.get('/recommended')
        .then(res => {
          this.songs = res.data
        })
        .catch(err => {
          this.error = err && err.response ? err.response : ''
        })
    },
    getSongsByTag (tag) {
      http.get(`/songs/tags/${tag}`)
        .then(res => {
          this.header = `Browsing category ${tag}`
          this.showHomeLink = true
          this.songs = res.data
        })
        .catch(err => {
          this.error = err && err.response ? err.response : ''
        })
    },
    getSongsByArtist (artist) {
      http.get(`/songs/${artist}`)
        .then(res => {
          this.header = `Browsing songs by ${artist}`
          this.showHomeLink = true
          this.songs = res.data
        })
        .catch(err => {
          this.error = err && err.response ? err.response : ''
        })
    },
    togglePlay (index) {
      const selectedSong = Object.assign({}, this.songs[index])
      selectedSong.playing = this.globalPlaying = !this.songs[index].playing || false
      this.globalTitle = this.songs[index].title
      this.globalArtist = this.songs[index].artist

      for (let song of this.songs) {
        song.playing = false
      }

      Vue.set(this.songs, index, selectedSong)
    },
    limitTags (tags) {
      return tags.slice(0, 3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

a:focus,
a:hover {
  cursor: pointer;
  text-decoration: underline !important;
}

.header {
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.content {
  padding-bottom: 75px;
}
.song-tags-wrapper {
  overflow-y:auto;
  overflow-x: auto;
  height: 25px;
  white-space: nowrap;
}
.song-tag {
  margin-right: 1em;
  cursor: pointer;
}

.play-button {
  cursor: pointer;
}

</style>
