<template>
  <div id="wrapper" class="about">
      <div class="landing-content">
          <img src="../static/logo.png" class="website-logo">

          <form role="search" v-on:submit.prevent="searchDocuments()">
              <div class="input-group col-md-6">
                  <input type="text" class="form-control" placeholder="Search..." v-model.lazy="searchString">
                  <span class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                      <icon name="search"></icon>
                  </button>
                  </span>
              </div>
          </form>
      </div>
  </div>
</template>
<script>
import 'vue-awesome/icons/search'

import icon from 'vue-awesome/components/Icon.vue'

export default {
  components: {
    icon
  },
  data: function () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchDocuments: function () {
      this.$router.push({name: 'documents', query: { search: this.searchString }})
    }
  }
}
</script>
<style>
.landing-content {
  text-align: center;
  font-size: 5em;
  margin-top: 100px;
  color: #777;
}

.landing-content .input-group {
  margin: auto;
  padding: 20px;
}

.landing-content .website-logo {
  height: 150px;
}

</style>