<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="container-fluid">
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
          <button class=" btn btn-danger navbar-btn navbar-right" id="upload-button" type="button" >
              Upload
          </button>
          <form class="navbar-form navbar-right" role="search" v-on:submit.prevent="searchDocuments()">
              <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search..." v-model.lazy="searchString">
                  <span class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                    <icon name="search"></icon>
                  </button>
                  </span>
              </div>
          </form>
        </div>
        <!-- /.navbar-top-links -->
    </nav>
</template>
<script>
import 'vue-awesome/icons/search'

import icon from 'vue-awesome/components/Icon.vue'

export default {
  components: {
    icon
  },
  props: ['searchString'],
  methods: {
    toogleSideBar: function (event) {
      this.$emit('tooglesidebar')
    },
    searchDocuments: function () {
      // checks if prop is undefined
      if (this.searchString === undefined) {
        this.searchString = ''
      }
      this.$router.push({name: 'documents', query: { search: this.searchString }})
    }
  }
}
</script>

<style>
.navbar-right {
  margin-right: 0px
}
</style>