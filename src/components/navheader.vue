<template>
  <div class="VueToNuxtLogo">

      <nav class="navbar navbar-default navbar-static-top" role="navigation">
          <div class="navbar-header">                     
              <button type="button" class="navbar-toggle" v-on:click="toogleSideBar">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                  </button>


              <router-link class="navbar-brand" to="/">Holocron</router-link>
          </div>
          <!-- /.navbar-header -->

          <ul class="nav navbar-top-links navbar-right ">
              <li v-bind:class="{ active: activeSidebar=='documents' }" id="navheader-doc">
                  <router-link to="documents">Documents</router-link>
              </li>
              <li v-bind:class="{ active: activeSidebar=='visualization' }" id="navheader-viz">
                  <router-link to="visualization">Visualization</router-link>
              </li>
              <li v-bind:class="{ active: activeSidebar=='about' }" id="navheader-about">
                  <router-link to="about">About</router-link>
              </li>               
          </ul>
          <!-- /.navbar-top-links -->
      </nav>
    </div>
</template>

<script>
export default {
  props: ['activeSidebar'],
  methods: {
    toogleSideBar: function (event) {
      this.$emit('tooglesidebar')
    }
  }
}
</script>