<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded" v-if="showNavBar">
    <div class="container">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link  to="/app" class="navbar-brand">Vamp Music</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <img class="avatar" :src="imageLink" alt="" width="30px" height="30px">
        <span class="navbar-text mr-3">
          {{userName}}
        </span>
        <form class="form-inline my-2 my-lg-0">
          <button v-if="isLoggedIn" @click.prevent="logout()" class="btn btn-outline-primary my-2 my-sm-0">Logout</button>
          <button v-else @click.prevent="login()" class="btn btn-success my-2 my-sm-0">Login</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',
    methods: {
      login () {
        this.$router.push('/login')
      },
      logout () {
        this.$store.dispatch('storeEvent', { event: 'logout', payload: {} })
        localStorage.removeItem('vamp_music_token')
        localStorage.removeItem('vamp_music_profile')
        this.$router.push('/')
      }
    },
    mounted () {
    },
    computed: {
      profile () {
        return JSON.parse(localStorage.getItem('vamp_music_profile'))
      },
      userName () {
        return this.profile.first_name + ' ' + this.profile.last_name
      },
      imageLink () {
        return this.profile.avatar
      },
      showNavBar () {
        return this.$route.path !== '/'
      },
      isLoggedIn () {
        return !!localStorage.getItem('vamp_music_token')
      }
    }
  }
</script>

<style scoped>
  .avatar {
    border-radius: 50%;
    margin-right: 10px;
  }
</style>
