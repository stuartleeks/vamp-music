<template>
  <div class="playbar fixed-bottom">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 text-left p-3" v-if="currentTrack">
          <h6>{{currentTrack.title}}</h6>
          <small>{{currentTrack.artist}}</small>
        </div>
        <div class="col-sm-4 buttons-bar p-3">
          <span class="icon icon-music-rewind-button"></span>
          <span class="icon" :class="playing ? 'icon-music-pause-button' : 'icon-music-play-button'" @click="togglePlay(currentTrack.track_id)"></span>
          <span class="icon icon-music-fastforward-button"></span>
        </div>
        <div class="col-sm-4 text-left p-3">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'playbar',
    methods: {
      togglePlay (trackId) {
        this.$store.dispatch('togglePlay', trackId)
      }
    },
    computed: {
      currentTrack () {
        return this.$store.getters.currentTrack
      },
      playing () {
        return this.$store.getters.globalPlaying
      }
    }
  }
</script>

<style scoped>
  .playbar {
    height: 75px;
    background-color: #f7f7f7;
  }
  .buttons-bar > .icon {
    font-size: 40px;
    padding: 10px;
    cursor: pointer;
  }
</style>
