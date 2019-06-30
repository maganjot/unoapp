<template>
  <div>
    <v-app toolbar>
    <toolbar></toolbar>
    <main>
      <v-container fluid>
      <landing></landing>
      </v-container>
    </main>
    </v-app>
  </div>
</template>
<script>
import LandingPage from '../LandingPage/LandingPage.vue'
import Toolbar from '../Toolbar/Toolbar.vue'
export default {
  components: {
    'toolbar': Toolbar,
    'landing': LandingPage
  }
}
</script>
<style>
  .navigation-drawer--absolute {
    position: fixed;
    background: #fff;
  }
  a.list__tile {
    color: rgba(0,0,0,.87);
  }
  .toolbar__title {
    cursor: pointer;
    color: #fff;
  }
</style>
