<template>

  <v-app id="example-2" toolbar>
    <main>
     <toolbar></toolbar>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm4 offset-sm1 v-if="menu_list" v-for="item in menu_list">
            <v-card >
              <ul >
              <li>
                       <p> <img :src="item.image_url" class="img-loc"></p>
                     <p>Name : {{ item.name }}</p>
                     <p>Description : {{ item.desc }}</p>
                     <p>SKU : {{ item.sku }}</p>
                  </li>
                </ul>     
      
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </main>
  </v-app>

</template>
<style>
.img-loc {width:100%;}
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
  import Toolbar from '../Toolbar/Toolbar.vue'
  Vue.use(VueAxios, axios)
  Vue.use(Router)
  export default {
    name: '',
    components: {
      'toolbar': Toolbar
    },
    data: () => ({
      StatusMessage: '',
      menu_list: '',
      ErrorText: '',
      loadStatus: false,
      errorStatus: false
    }),
    methods: {
      getLoctionList: function () {
        var self = this
        self.menu_list
        let baseURL = 'https://multivendor.dev.api.unoapp.io/'
        axios({
          method: 'GET',
          url: baseURL + 'api/app/menus/full/' + this.$route.params.locationID,
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'app-id': localStorage.getItem('appid'),
            'app-secret': localStorage.getItem('appsecret')
          }
        })
        .then(function (response) {
          return response
        })
        .then(function (data) {
          if (data.data.payload !== undefined) {
            self.menu_list = data.data.payload
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
