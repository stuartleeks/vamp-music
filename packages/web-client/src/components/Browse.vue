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
        <h3 class="header">Browsing {{header}}</h3>
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
    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>
  import Spinner from './Spinner'
  export default {
    name: 'browse',
    components: {
      spinner: Spinner
    },
    data () {
      return {
        error: ''
      }
    },
    mounted () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    computed: {
      songs () {
        return this.$store.getters.songs
      },
      header () {
        return this.$route.query.artist || this.$route.query.tag
      }
    },
    methods: {
      togglePlay (index) {
        this.$store.dispatch('togglePlay', index)
      },
      fetchData () {
        if (this.$route.query.artist) this.$store.dispatch('getSongsByArtist', this.$route.query.artist)
        if (this.$route.query.tag) this.$store.dispatch('getSongsByTag', this.$route.query.tag)
      },
      limitTags (tags) {
        return tags.slice(0, 3)
      }
    }
  }
</script>
<style scoped="">
  .data-button {
    padding-top: .6em;
    padding-bottom: .1em;
  }

  .play-button {
    font-size: 1.5em;
  }

</style>
