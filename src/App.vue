<template>
  <div id="app">
  	        <!-- Navigation --> 
    <navheader v-bind:active-sidebar="$route.name" v-on:tooglesidebar="sidebarCollapse=!sidebarCollapse"></navheader>
    <router-view v-bind:sidebar-collapse="sidebarCollapse"></router-view>
  </div>
</template>



<script>
import navheader from '@/components/navheader.vue'

export default {
  name: 'app',
  components: {
    navheader
  },
  data: function () {
    return {
      sidebarCollapse: true
    }
  }
}
</script>