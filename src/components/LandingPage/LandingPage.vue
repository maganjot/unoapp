<template>

  <v-app id="example-2" toolbar>
    <main>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm4 offset-sm1  v-if="location_list">
            <v-card v-for="item in location_list">
              <ul>
                <li>
                  <p>City : {{ item.city }}</p>
                   <p>Name : {{ item.name }}</p>
                   <p>Display Name : {{ item.display_name }}</p>
                   <p>Province : {{ item.province }}</p>
                   <p>Country : {{ item.country }}</p>
                </li>
              </ul>
              <v-card-title primary-title class="headingtext">
                
                <router-link :to="{ name: 'menu-page', params: { locationID: item.id } }" append>
                    <h4 class="headline mb-0"><a>View Menu </a></h4>
                </router-link>
              </v-card-title>
          </v-card>
      </v-flex>

        </v-layout>
      </v-container>
    </main>
  </v-app>

</template>
<style>

  .card__media__content {
    text-align: center;
  }
  .headingtext {
    background: #FF562F;
    color: #fff;
    text-align: center;
  }
  .card__media__content {
    margin: auto;
  }
  .card__media__content i {
    font-size: 50px;
  }
  .headingtext a {
    color: #fff;
    text-decoration: none;
  }
  .card__media__content img {
    object-fit: cover;
    width: 360px;
  }
  h4.headline.mb-0 {
    margin: auto;
  }
  .card ul {
    list-style: none;
    padding: 20px 20px 6px 20px;
}
</style>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Router from 'vue-router'
  Vue.use(VueAxios, axios)
  Vue.use(Router)
  export default {
    data: () => ({
      StatusMessage: '',
      location_list: '',
      ErrorText: '',
      loadStatus: false,
      errorStatus: false
    }),
    methods: {
      getLoctionList: function () {
        var self = this
        self.location_list
        let baseURL = 'https://multivendor.dev.api.unoapp.io/'
        axios({
          method: 'POST',
          url: baseURL + 'api/app/locations/all',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'app-id': localStorage.getItem('appid'),
            'app-secret': localStorage.getItem('appsecret')
          },
          data: {
            'rpp': 10,
            'paginate': true,
            'brand_id': localStorage.getItem('brandid')
          }
        })
        .then(function (response) {
          return response
        })
        .then(function (data) {
          if (data.data.payload.data !== undefined) {
            self.location_list = data.data.payload.data
          }
        }, function (data) {
          self.errorMessage = data.response.data.message
        })
      }
    },
    beforeMount () {
      this.getLoctionList()
    }
  }
</script>
<style>

</style>
