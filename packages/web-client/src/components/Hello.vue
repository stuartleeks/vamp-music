<template>
  <div class="hello">
    <h1>Vamp Music</h1>
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      charts: []
    }
  },
  mounted () {
    this.getCharts()
  },
  methods: {
    getCharts () {
      axios.get('http://localhost:3000/charts/NL')
        .then(res => {
          this.charts = res.data
        })
        .catch(err => {
          this.error = err
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
