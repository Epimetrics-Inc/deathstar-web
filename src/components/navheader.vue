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
                  <a v-if="!isLoggedIn" v-on:click="clickLogin">
                      Login
                  </a>
                  <a v-if="isLoggedIn" v-on:click="clickLogout">
                      Logout
                  </a>
              </li>
          </ul>
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

import icon from 'vue-awesome/components/Icon.vue'
import modal from 'uiv/src/components/modal/Modal.vue'

export default {
  components: {
    icon,
    modal
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
      return this.$store.state.isLoggedIn
    },
    loginStatus () {
      let loginStatus = this.$store.state.loginStatus

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