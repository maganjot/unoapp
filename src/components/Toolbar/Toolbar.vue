<template>
  <v-toolbar fixed class="deep-orange" dark>

    <v-toolbar-title>Unoapp</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title @click= "doLogout" >LogOut</v-toolbar-title>
        </v-toolbar>

</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Router from 'vue-router'
  Vue.use(VueAxios, axios)
  Vue.use(Router)
  export default {
    methods: {
      doLogout: function () {
        var self = this
        let baseURL = 'https://multivendor.dev.api.unoapp.io/'
        axios({
          method: 'GET',
          url: baseURL + '/api/application/admin/logout',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'app-id': localStorage.getItem('appid'),
            'app-secret': localStorage.getItem('appsecret'),
            'auth-token': localStorage.getItem('token')
          }
        })
        .then(function (response) {
          return response
        })
        .then(function (data) {
          if (data.data.code === 200) {
            localStorage.clear()
            window.location = '/#/'
          }
        }, function (data) {
          self.errorMessage = data.response.data.message
        })
      }
    }
  }
</script>
<style>
  .toolbar__title {
    cursor: pointer;
  }
  .toolbar__title {
    margin-right: 15px;
}
  .toolbar__title.emails {
    cursor: default;
    font-size: 13px;
    position: absolute;
    right: 16px;
    margin: 20px 0 0px 0px;
    color: #eee;
  }
    .card {
    margin-top: 100px;
}
</style>
