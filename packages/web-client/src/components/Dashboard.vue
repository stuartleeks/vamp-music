<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="alert alert-info" v-if="error">
          {{error.status}}
          {{error.statusText}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <h2>Charts</h2>
        <ul>
          <li v-for="(value, key) in charts">
            <h3>{{key}}</h3>
            <ul>
              <li v-for="entry in value">{{entry}}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <h2>Songs</h2>
        <ul v-for="song in songs">
          <li>
            {{song.title}}
          </li>
        </ul>
      </div>
    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>
import http from '../services/http'
export default {
  name: 'dashboard',
  data () {
    return {
      error: '',
      charts: [],
      songs: []
    }
  },
  mounted () {
    this.getCharts()
    this.getSongs()
  },
  methods: {
    getCharts () {
      http.get('/charts/NL')
        .then(res => {
          this.charts = res.data
        })
        .catch(err => {
          this.error = err
        })
    },
    getSongs () {
      http.get('/songs')
        .then(res => {
          this.songs = res.data
        })
        .catch(err => {
          this.error = err && err.response ? err.response : ''
        })
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
</style>
