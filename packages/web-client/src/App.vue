<template>
  <div id="app">
    <navbar class="mb-3"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import bus from './services/bus'
  import Navbar from '@/components/Navbar.vue'
  import '../node_modules/bootstrap/dist/css/bootstrap.css'
  export default {
    name: 'app',
    components: {
      Navbar
    },
    created () {
      bus.$on('errors:401', () => {
        localStorage.removeItem('vamp_music_token')
        this.$router.push('/')
      })
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  cursor: pointer;
}
</style>
