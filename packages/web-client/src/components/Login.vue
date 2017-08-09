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
        <button @click.prevent="login()" class="btn btn-block btn-primary btn-lg mb-4">login</button>
        <div class="alert alert-danger" v-if="error">
          Please provide a valid email and password
        </div>
        <button @click.prevent="setRandomUser()">randomize</button>
      </form>
    </div>
  </div>
</template>
<script>
  import http from '../services/http'
  import Vue from 'Vue'
  export default {
    name: 'login',
    mounted () {
      this.setRandomUser()
    },
    data () {
      return {
        email: 'lbennen5t@washington.edu',
        password: 'NLHS4uOIyAd6',
        error: '',
        users: [{
          'id': 313,
          'first_name': 'Joelie',
          'last_name': 'Giffon',
          'email': 'jgiffon8o@boston.com',
          'gender': 'Female',
          'ip_address': '193.149.83.66',
          'password': 'Ypc5CUu8D8S',
          'avatar': 'https://robohash.org/utaccusantiumdoloribus.jpg?size=50x50&set=set1'
        },
        {
          'id': 314,
          'first_name': 'Tadeo',
          'last_name': 'Retchford',
          'email': 'tretchford8p@prlog.org',
          'gender': 'Male',
          'ip_address': '191.208.29.147',
          'password': 'pn6Wnkoghx',
          'avatar': 'https://robohash.org/eaundeest.bmp?size=50x50&set=set1'
        },
        {
          'id': 315,
          'first_name': 'Roanne',
          'last_name': 'Bezant',
          'email': 'rbezant8q@nba.com',
          'gender': 'Female',
          'ip_address': '249.70.214.121',
          'password': 'Mo3riswP',
          'avatar': 'https://robohash.org/quiinventorequasi.png?size=50x50&set=set1'
        },
        {
          'id': 316,
          'first_name': 'Allard',
          'last_name': 'Simanek',
          'email': 'asimanek8r@zimbio.com',
          'gender': 'Male',
          'ip_address': '167.243.240.195',
          'password': 'by9Z1qZl4y',
          'avatar': 'https://robohash.org/inipsahic.jpg?size=50x50&set=set1'
        },
        {
          'id': 317,
          'first_name': 'Mag',
          'last_name': 'Hatcher',
          'email': 'mhatcher8s@nbcnews.com',
          'gender': 'Female',
          'ip_address': '77.55.5.118',
          'password': 'tiB3xDp',
          'avatar': 'https://robohash.org/isteautaccusamus.bmp?size=50x50&set=set1'
        },
        {
          'id': 318,
          'first_name': 'Blair',
          'last_name': 'Defont',
          'email': 'bdefont8t@timesonline.co.uk',
          'gender': 'Male',
          'ip_address': '240.180.250.219',
          'password': 'SHNSAVAJxn',
          'avatar': 'https://robohash.org/doloremautqui.png?size=50x50&set=set1'
        },
        {
          'id': 319,
          'first_name': 'Griselda',
          'last_name': 'McIan',
          'email': 'gmcian8u@who.int',
          'gender': 'Female',
          'ip_address': '220.248.70.204',
          'password': 'CZYSOOYm',
          'avatar': 'https://robohash.org/ipsatemporeest.jpg?size=50x50&set=set1'
        },
        {
          'id': 320,
          'first_name': 'Bren',
          'last_name': 'Tinsey',
          'email': 'btinsey8v@spiegel.de',
          'gender': 'Male',
          'ip_address': '22.176.202.163',
          'password': 'V9A9fr',
          'avatar': 'https://robohash.org/beataealiquidinventore.png?size=50x50&set=set1'
        },
        {
          'id': 321,
          'first_name': 'Lucinda',
          'last_name': 'Matthessen',
          'email': 'lmatthessen8w@nps.gov',
          'gender': 'Female',
          'ip_address': '81.156.209.32',
          'password': 'S47IpUk',
          'avatar': 'https://robohash.org/autlaboreeligendi.jpg?size=50x50&set=set1'
        },
        {
          'id': 322,
          'first_name': 'Emilee',
          'last_name': 'McKillop',
          'email': 'emckillop8x@nsw.gov.au',
          'gender': 'Female',
          'ip_address': '74.42.109.178',
          'password': 'zQDG47pRi8',
          'avatar': 'https://robohash.org/utdolorpossimus.bmp?size=50x50&set=set1'
        },
        {
          'id': 323,
          'first_name': 'Nadeen',
          'last_name': 'Lickess',
          'email': 'nlickess8y@comcast.net',
          'gender': 'Female',
          'ip_address': '138.195.84.149',
          'password': '9tBaJA',
          'avatar': 'https://robohash.org/voluptasineaque.png?size=50x50&set=set1'
        },
        {
          'id': 324,
          'first_name': 'Maryl',
          'last_name': 'Hotton',
          'email': 'mhotton8z@harvard.edu',
          'gender': 'Female',
          'ip_address': '248.30.124.162',
          'password': 'seRcA4caAxt',
          'avatar': 'https://robohash.org/aututinventore.bmp?size=50x50&set=set1'
        },
        {
          'id': 325,
          'first_name': 'Annamarie',
          'last_name': 'Chesterton',
          'email': 'achesterton90@hc360.com',
          'gender': 'Female',
          'ip_address': '185.214.89.92',
          'password': 'TImTg8REB',
          'avatar': 'https://robohash.org/nostrumassumendaeligendi.bmp?size=50x50&set=set1'
        },
        {
          'id': 326,
          'first_name': 'Valma',
          'last_name': 'Stubbley',
          'email': 'vstubbley91@weather.com',
          'gender': 'Female',
          'ip_address': '31.144.251.123',
          'password': 'gdnkz0',
          'avatar': 'https://robohash.org/nemoporrotempore.jpg?size=50x50&set=set1'
        },
        {
          'id': 327,
          'first_name': 'Crystie',
          'last_name': 'Tschirasche',
          'email': 'ctschirasche92@wikia.com',
          'gender': 'Female',
          'ip_address': '59.4.48.229',
          'password': 'r7nWzBM',
          'avatar': 'https://robohash.org/utquodlaboriosam.png?size=50x50&set=set1'
        },
        {
          'id': 328,
          'first_name': 'Tessie',
          'last_name': 'Dumbare',
          'email': 'tdumbare93@icio.us',
          'gender': 'Female',
          'ip_address': '153.232.101.141',
          'password': 'ooSrdKtme',
          'avatar': 'https://robohash.org/liberoimpeditquasi.png?size=50x50&set=set1'
        },
        {
          'id': 329,
          'first_name': 'Adrian',
          'last_name': 'Radloff',
          'email': 'aradloff94@geocities.jp',
          'gender': 'Female',
          'ip_address': '216.30.27.185',
          'password': 'OeTPkhgFpB',
          'avatar': 'https://robohash.org/corporisrerumquod.png?size=50x50&set=set1'
        },
        {
          'id': 330,
          'first_name': 'Elene',
          'last_name': 'Delong',
          'email': 'edelong95@cbsnews.com',
          'gender': 'Female',
          'ip_address': '139.22.71.59',
          'password': '1HJUM1Nm',
          'avatar': 'https://robohash.org/perspiciatisnonpraesentium.png?size=50x50&set=set1'
        },
        {
          'id': 331,
          'first_name': 'Agosto',
          'last_name': 'Stratten',
          'email': 'astratten96@theguardian.com',
          'gender': 'Male',
          'ip_address': '107.61.103.251',
          'password': 'Fp4GLf4v0Hd',
          'avatar': 'https://robohash.org/utfacilisfugit.png?size=50x50&set=set1'
        },
        {
          'id': 332,
          'first_name': 'Friedrich',
          'last_name': 'Pavolillo',
          'email': 'fpavolillo97@mozilla.com',
          'gender': 'Male',
          'ip_address': '221.37.31.211',
          'password': 'h5GqpWv8P',
          'avatar': 'https://robohash.org/similiqueconsequaturdelectus.png?size=50x50&set=set1'
        },
        {
          'id': 333,
          'first_name': 'Bradan',
          'last_name': 'Thwaites',
          'email': 'bthwaites98@soundcloud.com',
          'gender': 'Male',
          'ip_address': '99.244.254.203',
          'password': 'iRMidg',
          'avatar': 'https://robohash.org/officiarecusandaecorporis.bmp?size=50x50&set=set1'
        },
        {
          'id': 334,
          'first_name': 'Coop',
          'last_name': 'Mordey',
          'email': 'cmordey99@hatena.ne.jp',
          'gender': 'Male',
          'ip_address': '194.175.145.142',
          'password': 'hd7ZdXdw3tz',
          'avatar': 'https://robohash.org/liberocorporisdistinctio.bmp?size=50x50&set=set1'
        },
        {
          'id': 335,
          'first_name': 'Kala',
          'last_name': 'Paolillo',
          'email': 'kpaolillo9a@guardian.co.uk',
          'gender': 'Female',
          'ip_address': '71.89.22.175',
          'password': 'B6NUFoR',
          'avatar': 'https://robohash.org/ipsareruminventore.png?size=50x50&set=set1'
        },
        {
          'id': 336,
          'first_name': 'Rayner',
          'last_name': 'Gianuzzi',
          'email': 'rgianuzzi9b@wufoo.com',
          'gender': 'Male',
          'ip_address': '117.28.236.51',
          'password': 'zjYq0no71IA',
          'avatar': 'https://robohash.org/quiautquis.bmp?size=50x50&set=set1'
        }
        ]
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
              this.$store.dispatch('storeEvent', { event: 'login', payload: {} })
            }
            Vue.nextTick(() => {
              this.$router.push('/app')
            })
          })
          .catch(err => {
            this.error = err
            setTimeout(() => {
              this.error = ''
            }, 3000)
          })
      },
      setRandomUser () {
        const user = this.users[Math.floor(Math.random() * this.users.length)]
        this.email = user.email
        this.password = user.password
      }
    }
  }
</script>
<style>
  .login {
    width: 350px;
    background: transparent;
    border: none;
  }
</style>


