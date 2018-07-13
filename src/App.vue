<template>
  <div id="app">
    <navheader v-if="this.$route.name !== 'landing'" v-bind:active-page="$route.name" v-on:tooglesidebar="sidebarCollapse=!sidebarCollapse"></navheader>
    <transition name="page">
      <router-view v-bind:sidebar-collapse="sidebarCollapse"></router-view>
    </transition>
    <navfooter></navfooter>
  </div>
</template>

<script>
import navfooter from '@/components/navfooter'
import navheader from '@/components/navheader'

export default {
  name: 'app',
  components: {
    navfooter,
    navheader
  },
  data: function () {
    return {
      sidebarCollapse: true
    }
  },
  mounted: function () {
    this.$store.dispatch('initSignList')
  },
  beforeCreate: function () {
  	document.title = this.$store.state.webappName
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
