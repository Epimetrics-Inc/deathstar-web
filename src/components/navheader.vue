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
          <ul class="nav navbar-top-links navbar-right">
              <li>
                  <dropdown ref="dropdown">
                      <a>
                          <icon name="download"></icon>
                      </a>
                      <template slot="dropdown">
                          <li>
                            <div>
                                <p>
                                    <strong>Task 1</strong>
                                    <span class="pull-right text-muted">40% Complete</span>
                                </p>
                                <div class="progress progress-striped active">
                                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 30%">
                                        <span class="sr-only">40% Complete (success)</span>
                                    </div>
                                </div>
                            </div>
                          </li>
                      </template>
                  </dropdown>
              </li>
              <li v-if="isLoggedIn">
                  <a>
                      Upload
                  </a>
              </li>
              <li>
                  <a v-if="!isLoggedIn" v-on:click="clickLogin">
                      Login
                  </a>
                  <a v-if="isLoggedIn" v-on:click="clickLogout">
                      Logout
                  </a>
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
        <modal class="login-modal" v-model="isLoginModalOpen" :header="false" :footer="false">
            <h1 class="text-center title">Login to your account</h1>
            <div class="alert alert-danger error" v-if="loginStatus === 'fail'">
                Error in logging in
            </div>
            <form role="form" v-on:submit.prevent="loginUser">
                <div class="form-group">
                    <input class="form-control" placeholder="username" v-model.lazy="auth.username">
                </div>
                <div class="form-group">
                    <input class="form-control" placeholder="password" type="password" v-model.lazy="auth.password">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>
            <div class="overlay" v-show="loginStatus === 'pending'">
              <icon name="spinner" pulse></icon>
            </div>
        </modal>
    </nav>
</template>
<script>
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/download'

import icon from 'vue-awesome/components/Icon.vue'
import modal from 'uiv/src/components/modal/Modal.vue'
import dropdown from 'uiv/src/components/dropdown/Dropdown.vue'

export default {
  components: {
    icon,
    modal,
    dropdown,
  },
  props: ['activePage'],
  data: function () {
    return {
      searchString: '',
      isLoginModalOpen: false,
      auth: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.login.isLoggedIn
    },
    loginStatus () {
      let loginStatus = this.$store.state.login.loginStatus

      if (loginStatus === 'success') {
        this.isLoginModalOpen = false
      }

      return loginStatus
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
    },
    clickLogin: function () {
      this.isLoginModalOpen = true
    },
    clickLogout: function () {
      this.$store.dispatch('logout')
    },
    loginUser: function () {
      this.$store.dispatch('login')
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

.modal-backdrop{
  display:none;
}

div.modal.fade.in {
  background-color: rgba(0, 0, 0, 0.3);
}

.login-modal .title {
  margin-bottom: 50px;
}
</style>