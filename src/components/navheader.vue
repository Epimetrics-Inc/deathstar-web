<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="container-fluid">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" v-on:click="toogleSideBar" v-if="activePage === 'documents'">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <router-link class="navbar-brand" to="/">Holocron</router-link>
          </div>
          <!-- /.navbar-header -->
          <ul class="nav navbar-nav navbar-right">
              <li>
                  <a href="#">
                      Upload
                  </a>
              </li>
              <li>
                  <a href="#">
                      Login
                  </a>
              </li>
          </ul>
<!--           <div>
            <button class=" btn btn-danger navbar-btn navbar-right" id="upload-button" type="button" >
                Upload
            </button>
          </div>
 -->          <form class="navbar-form navbar-right" role="search" v-on:submit.prevent="searchDocuments()">
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
  props: ['activePage'],
  data: function () {
    return {
      searchString: ''
    }
  },
  methods: {
    toogleSideBar: function (event) {
      this.$emit('tooglesidebar')
    },
    searchDocuments: function () {
      this.$router.push({name: 'documents', query: { search: this.searchString }})
    },
    initSearchString: function () {
      if (this.$route.hasOwnProperty('query')) {
        if (this.$route.query.hasOwnProperty('search')) {
          this.searchString = this.$route.query.search
        } else {
          this.searchString = ''
        }
      } else {
        this.searchString = ''
      }
    }
  },
  mounted: function () {
    this.initSearchString()
  },
  watch: {
    '$route': 'initSearchString'
  }
}
</script>

<style>
.navbar-right {
  margin-right: 0px
}
</style>