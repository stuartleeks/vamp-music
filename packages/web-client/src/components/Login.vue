<template>
  <div class="card login">
    <div class="card-block">
      <form>
        <h2 class="mb-4">Login</h2>
        <div class="form-group">
          <input v-model="email" class="form-control" type="text" placeholder="email"/>
        </div>
        <div class="form-group">
          <input v-model="password" class="form-control" type="password" placeholder="password"/>
        </div>
        <button @click.prevent="login()" class="btn btn-block btn-primary mb-4">login</button>
        <div class="alert alert-danger" v-if="error">
          Please provide a valid email and password
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import http from '../services/http'
  import Vue from 'Vue'
  export default {
    name: 'login',
    data () {
      return {
        email: 'lbennen5t@washington.edu',
        password: 'NLHS4uOIyAd6',
        error: ''
      }
    },
    methods: {
      login () {
        const credentials = {
          email: this.email,
          password: this.password
        }
        http.post(`/authenticate`, credentials)
          .then(res => {
            if (res.data && res.data.token) {
              localStorage.setItem('vamp_music_token', res.data.token)
            }
            http.get('/profile')
              .then(res => {
                localStorage.setItem('vamp_music_profile', JSON.stringify(res.data))
                Vue.nextTick(() => {
                  this.$router.push('/app')
                })
              })
              .catch(err => {
                console.error(err)
              })
          })
          .catch(err => {
            this.error = err
            setTimeout(() => {
              this.error = ''
            }, 3000)
          })
      }
    }
  }
</script>
<style>
  .login {
    width: 450px;
  }
</style>
