<template>
  <div class="login">
    <h1></h1>
    <div class="form-block">
        <div class="form-wrapper">
          <div class="block-header">
            <h2>{{ msg }}</h2>
          </div>
          <p class="error" v-if="errorMessage"> {{errorMessage}} </p>
            <form v-on:submit.prevent="doLogin('form-1')" id="form" data-vv-scope="form-1">
                <div class="field-entry">
                    <label for="field-1">Username *</label>
                  <input name="user_name" id="field-1" v-model="credentials.user_name" v-validate="'required|url'" :class="{'input': true, 'is-danger': errors.has('form-1.user_name') }" type="text" placeholder="username">
                  <span v-show="errors.has('form-1.user_name')" class="help is-danger">{{ errors.first('form-1.user_name') }}</span>
                </div>
                <div class="field-entry">
                    <label for="field-2">Your Password *</label>
                    <input id="field-2" v-model="credentials.password" name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('form-1.password') }" type="password" placeholder="Password">
                    <span v-show="errors.has('form-1.password')" class="help is-danger">{{ errors.first('form-1.password') }}</span>
                </div>
             
                <div class="button">LOGIN
                    <input type="submit" name="button" >
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
Vue.use(VueAxios, axios)
Vue.use(Router)
export default {
  name: 'login',
  data () {
    return {
      credentials: {
        user_name: null,
        password: null,
        app_id: '',
        app_secret: ''
      },
      errorMessage: '',
      submitData: '',
      msg: 'Unoapp '
    }
  },
  methods: {
    doLogin: function (scope) {
      var self = this
      this.submitData = this.credentials
      let baseURL = 'https://multivendor.dev.api.unoapp.io/'
      this.$validator.validateAll(scope).then((result) => {
        if (result) {
          console.log(this.credentials.user_name)
          axios({
            method: 'post',
            url: baseURL + 'api/application/admin/login',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            data: {
              user_name: this.credentials.user_name,
              password: this.credentials.password
            }
          })
          .then(function (response) {
            return response
          })
          .then(function (data) {
            localStorage.setItem('appid', data.data.App.app_id)
            localStorage.setItem('appsecret', data.data.App.app_secret)
            localStorage.setItem('brandid', data.data.App.brand_id)
            localStorage.setItem('token', data.data.session.token)
            localStorage.setItem('expiry', data.data.session.expiry)
            window.location = '/#/index'
          }, function (data) {
            self.errorMessage = data.response.data.message
          })
        }
        // eslint-disable-next-line
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



.block-header h2 {
        font-size: 40px;
        line-height: 40px;
        color: #232c3b;
        font-family: 'black', sans-serif, Arial;
        margin-bottom: 20px;
        font-weight: bold;
        margin-top: 30px;
    }
         
.form-block {
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.05);
    padding-bottom: 30px;
    padding-top: 100px;
    position: relative;
    max-width: 560px;
    margin: 50px auto;
    padding-left: 20px;
    text-align: center;
    padding-right: 20px;
}

 
.padding-left {
  padding-left: 0 !important;
}
.
.field-entry label {
    display: block;
    font-size: 14px;
    color: #232c3b;
    line-height: 22px;
    margin-bottom: 14px;
    padding: 0 20px;
}
.field-entry input, .field-entry textarea {
    width: 100%;
    height: 50px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background-color: #fff;
    -webkit-box-shadow: 1px 1px 2px rgba(0,0,0,.2);
    box-shadow: 1px 1px 2px rgba(0,0,0,.2);
    line-height: 50px;
    padding: 0 20px;
    border: none;
    font-size: 14px;
    color: #6a7483;
}
form{
  text-align: left;
  font-family: 'regular', sans-serif, Arial;
}
.field-entry {
    margin-bottom: 19px;
}
.button {
    line-height: 15px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background-color: #ff6c3a;
    -webkit-box-shadow: 1px 1px 2px rgba(0,0,0,.2), inset 0 -2px #fd845b;
    box-shadow: 1px 1px 2px rgba(0,0,0,.2), inset 0 -2px #fd845b;
    border: solid 1px #ff6c3a;
    display: inline-block;
    padding: 16px 20px;
    font-size: 11px;
    color: #fff;
    font-family: 'bold', sans-serif, Arial;
    text-transform: uppercase;
    text-align: center;
    position: relative;
}
.button input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
}
.form-block .button {
    display: block;
}
.button:hover {
    text-decoration: none;
    color: #fff;
    -webkit-box-shadow: 1px 1px 2px rgba(0,0,0,.2), inset 0 -40px #fd845b;
    box-shadow: 1px 1px 2px rgba(0,0,0,.2), inset 0 -40px #fd845b;
}
.help.is-danger {
  color: #ff3860;
}
.help {
  display: block;
  font-size: 11px;
  margin-top: 5px;
}
.field-entry input.input.is-danger {
  border: 1px solid #ff3860;
}
.error {
  color: #fff;
}
.field-entry.forgot a {
  font-size: 20px;
  text-decoration: none;
}
</style>
