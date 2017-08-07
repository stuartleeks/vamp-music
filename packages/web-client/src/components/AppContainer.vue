<template>
  <div class="appContainer">
    <div class="alert alert-info" v-if="error">
      {{error.status}}
      {{error.statusText}}
    </div>
    <router-view></router-view>
    <playbar></playbar>
  </div>
</template>

<script>
  import Playbar from './Playbar.vue'
  import Vue from 'Vue'
  export default {
    name: 'appContainer',
    components: {
      Playbar
    },
    data () {
      return {
        globalPlaying: false,
        globalTitle: '...',
        globalArtist: '...'
      }
    },
    methods: {
      togglePlay (index) {
        const selectedSong = Object.assign({}, this.songs[index])
        selectedSong.playing = this.globalPlaying = !this.songs[index].playing || false
        this.globalTitle = this.songs[index].title
        this.globalArtist = this.songs[index].artist

        for (let song of this.songs) {
          song.playing = false
        }

        Vue.set(this.songs, index, selectedSong)
      }
    }
  }
</script>

<style>
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
    color: #5bc0de;
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
