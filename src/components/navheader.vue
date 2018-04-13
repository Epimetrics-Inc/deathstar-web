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
              <router-link class="navbar-brand" to="/"><img src="../static/logo.png" class="website-logo"></router-link>
          </div>
          <!-- /.navbar-header -->
          <ul class="nav navbar-top-links navbar-right">
              <li>
                  <dropdown ref="dropdown" v-if="Object.keys(this.$store.state.tasks.taskList).length > 0">
                      <a>
                          <icon name="download"></icon>
                      </a>
                      <template slot="dropdown">
                          <li v-for="t in this.$store.state.tasks.taskList">
                            <div>
                                <p>
                                    <strong>
                                        {{ t.name }}
                                    </strong>
                                    <span v-if="t.status==='pending'" class="pull-right text-muted">{{t.progress}}% Complete</span>
                                </p>
                                <div v-if="t.status==='pending'" class="progress progress-striped active">
                                    <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="{width: t.progress + '%'}">
                                        <span class="sr-only">{{t.progress}}% Complete (success)</span>
                                    </div>
                                </div>
                            </div>
                          </li>
                      </template>
                  </dropdown>
              </li>
          </ul>
          <form class="navbar-form" role="search" v-on:submit.prevent="searchDocuments()">
              <div class="input-group col-md-6">
                  <input type="text" class="form-control" v-model.lazy="searchString">
                  <span class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                      <icon name="search"></icon>
                  </button>
                  </span>
              </div>
          </form>
        </div>
    </nav>
</template>
<script>
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/download'

import icon from 'vue-awesome/components/Icon.vue'
import dropdown from 'uiv/src/components/dropdown/Dropdown.vue'

export default {
  components: {
    icon,
    dropdown,
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

.navbar-right a{
  cursor: pointer;
}

.navbar-header .navbar-brand {
  padding: 0px;
}

.navbar-header .website-logo {
  height: 50px;
  padding: 5px;
}
</style>