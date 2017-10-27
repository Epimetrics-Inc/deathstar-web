<template>
    <div id="wrapper">
        <navheader v-bind:search-string="searchString" v-on:tooglesidebar="sidebarCollapse=!sidebarCollapse"></navheader>
        <div class="container-fluid">    
            <div class="row">
              <div class="navbar-default col-md-3 sidebar">
                  <collapse class="navbar-collapse" v-model="sidebarCollapse">
                    <div id="filter-menu">
                        <div class="filter-header">
                          Themes
                        </div>
                        <div id="filter-themes">
                            <label class="checkbox" v-for="filter in filters">
                                <input type="checkbox" v-bind:value="filter" v-model="checkedFilters">
                                {{ filter }}
                            </label>
                        </div>
                        <hr>
                        <div class="filter-header">
                          Sort By
                        </div>
                        <div id="filter-sort">
                            <label class="radio">
                                <input type="radio" value="-date" v-model="sortBy">
                                Date (newest)
                            </label>
                            <label class="radio">
                                <input type="radio" value="date" v-model="sortBy">
                                Date (oldest)
                            </label>
                            <label class="radio">
                                <input type="radio" value="" v-model="sortBy">
                                Relevance
                            </label>
                        </div>
                        <hr>
                        <div class="filter-header">
                            Date Range
                        </div>
                        <div id="filter-date" class="form-inline">
                            <!-- datefrom dropdown + date-picker -->
                            <dropdown class="form-group" id="filter-date-from">
                                <label for="datefrom">From </label>
                                <div class="input-group" id="datefrom">
                                    <input class="form-control" type="text" v-model.lazy="dateFrom">
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" type="button" data-role="trigger">
                                            <icon name="calendar"></icon>
                                        </button>
                                    </div>
                                </div>
                                <template slot="dropdown">
                                    <li>
                                        <date-picker v-model="dateFrom" :today-btn="false" :clear-btn="false" class="datepicker"></date-picker>
                                    </li>
                                </template>
                            </dropdown>

                            <!-- dateto dropdown + date-picker -->
                            <dropdown class="form-group" id="filter-date-from">
                                <label for="dateto">To </label>
                                <div class="input-group" id="dateTo">
                                    <input class="form-control" type="text" v-model.lazy="dateTo">
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" type="button" data-role="trigger">
                                            <icon name="calendar"></icon>
                                        </button>
                                    </div>
                                </div>
                                <template slot="dropdown">
                                    <li>
                                        <date-picker v-model="dateTo" :today-btn="false" :clear-btn="false" class="datepicker"></date-picker>
                                    </li>
                                </template>
                            </dropdown>
                        </div>
                        <hr>
                        <div class="filter-header">
                            Signed by
                        </div>
                        <div id="filter-signed">
                            <input class="form-control" type="text" v-model="signedBy">
                        </div>
                        <hr>   
                        <button type="button" class="btn btn-default" v-on:click="updateFilters()">Update Results</button>
                    </div>
                  </collapse>
              </div>
                <!-- /.navbar-static-side -->

              <!-- Page Content -->
              <div class="col-md-9" id="page-wrapper">
                  <div class="alert alert-danger error" v-if="errorMessage">
                      {{ errorMessage }}
                  </div>
                  <div class="search-wrapper" v-if="errorMessage === false">
                    <ul class="nav document-list" id="side-menu">
                        <li v-for="ao in aoDocuments" :key="ao.pk">
                            <router-link v-bind:to="{ name:'document', params: { id: ao.pk } }">
                                <div class="list-checkbox">
                                    <input v-bind:value="ao.pk" type="checkbox">
                                </div>
                                <div class="ao-details">
                                    <div class="pull-right">
                                        {{ ao.date }}
                                    </div>
                                    <div>{{ ao.doctype }} {{ ao.docnum}}</div>
                                    <div class="small text-success"> 
                                        {{ ao.sign }}
                                    </div>
                                    <div class="text-muted"> 
                                        {{ ao.subject }}
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>

                    <pagination v-model="currentPage" :total-page="totalPage" :max-size="maxSize" :size="'sm'" :boundary-links="true" :direction-links="false" v-on:change="updateCurrentPage"></pagination>
                  </div>
                  <div class="overlay" v-show="isLoading">
                    <icon name="spinner" pulse></icon>
                  </div>
              </div>
              <!-- /#page-wrapper -->
            </div>
        </div>
    </div>
</template>

<script>
// icon imports
import 'vue-awesome/icons/calendar'
import 'vue-awesome/icons/spinner'

import icon from 'vue-awesome/components/Icon.vue'
import collapse from 'uiv/src/components/collapse/Collapse.vue'
import dropdown from 'uiv/src/components/dropdown/Dropdown.vue'
import pagination from 'uiv/src/components/pagination/Pagination.vue'

import navheader from '@/components/navheader'
import datePicker from '@/components/datepicker/DatePicker.vue'

import { getDocuments } from '@/api/api'

export default {
  components: {
    navheader,
    datePicker,
    icon,
    collapse,
    dropdown,
    pagination
  },
  data: function () {
    return {
      sidebarCollapse: true,
      aoDocuments: [],
      filters: [
        'Adolescent Health',
        'Geriatric Health',
        'MNCHN',
        'Special Population'
      ],
      searchString: '',
      dateFrom: '',
      dateTo: '',
      signedBy: '',
      checkedFilters: [],
      sortBy: 'date',
      currentPage: 1, // used for pagination
      maxSize: 8, // max number of pages in pagination component
      totalPage: 0, // total number of pages in pagination component
      numDocPerPage: 10, // number of document per page
      isOldRouteQuery: false,
      isLoading: false, // is loading document list
      errorMessage: false // contains string if there is error, else false
    }
  },
  methods: {
    /*
    * Validate data value, if invalid change to blank string
    * If valid but different from default format, convert to valid format
    */
    validateDate: function (dateObjectName) {
      var date = new Date(this[dateObjectName])
      var year
      var month
      var day

      if (isNaN(date)) {
        this[dateObjectName] = ''
      } else {
        month = '' + (date.getMonth() + 1)
        day = '' + date.getDate()
        year = date.getFullYear()

        if (month.length < 2) {
          month = '0' + month
        }
        if (day.length < 2) {
          day = '0' + day
        }

        this[dateObjectName] = [year, month, day].join('-')
      }
    },

    /*
    * Init document list and vue data values
    */
    initDocoments: function () {
      this.isLoading = true
      // init documents according to query
      getDocuments(this.$route.query).then(res => {
        this.aoDocuments = res.data.results
        this.totalPage = Math.ceil(parseInt(res.data.count) / this.numDocPerPage)
        this.isLoading = false

        if (res.data.count === 0) {
          this.errorMessage = 'No results found'
        } else {
          this.errorMessage = false
        }
      }).catch(error => {
        console.log(error)
        this.errorMessage = 'There was an error communicating with the server. Please refresh the page.'
        this.isLoading = false
      })

      // init vue data values according to query
      if (this.$route.hasOwnProperty('query') && !this.isOldRouteQuery) {
        // sets isOldRouteQuery back to false because it was set in updateResults to true
        this.isOldRouteQuery = false

        if (this.$route.query.hasOwnProperty('dateFrom')) {
          this.dateFrom = this.$route.query.dateFrom
        } else {
          this.dateFrom = ''
        }
        if (this.$route.query.hasOwnProperty('dateTo')) {
          this.dateTo = this.$route.query.dateTo
        } else {
          this.dateTo = ''
        }
        if (this.$route.query.hasOwnProperty('signedBy')) {
          this.signedBy = this.$route.query.signedBy
        } else {
          this.dateFrom = ''
        }
        if (this.$route.query.hasOwnProperty('ordering')) {
          this.sortBy = this.$route.query.ordering
        } else {
          this.sortBy = 'date'
        }
        if (this.$route.query.hasOwnProperty('search')) {
          this.searchString = this.$route.query.search
        } else {
          this.searchString = ''
        }
        if (this.$route.query.hasOwnProperty('page')) {
          this.currentPage = this.$route.query.page
        } else {
          this.currentPage = 1
        }
      }
    },
    /*
    * called when update results button is called
    */
    updateFilters: function () {
      this.currentPage = 1
      this.updateResults()
    },
    /*
    * Called when update results button or current page is changed
    */
    updateResults: function () {
      this.$router.push({name: 'documents',
        query: {
          // filters: this.checkedFilters,
          // dateFrom: this.dateFrom,
          // dateTo: this.dateTo,
          // signedBy: this.signedBy,
          ordering: this.sortBy,
          page: this.currentPage,
          search: this.searchString
        }
      })
    },
    /*
    * If currentPage is changed, update maxSize and doc list
    */
    updateCurrentPage: function () {
      this.maxSize = this.currentPage >= 995 ? 7 : 8 // update max size
      this.updateResults()
    }
  },
  watch: {
    /*
    * Validates dateFrom value if changed
    */
    dateFrom: function () {
      if (this.dateFrom !== '') {
        this.validateDate('dateFrom')
      }
    },
    /*
    * Validates dateFrom value if changed
    */
    dateTo: function () {
      if (this.dateTo !== '') {
        this.validateDate('dateTo')
      }
    },
    '$route': 'initDocoments'
  },
  mounted: function () {
    for (let filter of this.filters) { // initialize to check all filters
      this.checkedFilters.push(filter)
    }
    this.initDocoments()
  }
}
</script>

<style>
.sidebar{
  padding: 0;
}

.sidebar .navbar-collapse > *{
  margin-top:15px;
  margin-left:15px;
  margin-right:0px;
  margin-bottom:15px;
}

.filter-header {
  font-weight: 500;
  font-size: 15px;
  padding: 1px 5px;
  border-left: solid;
  margin: 10px 0px;
}

#filter-menu {
  color: #565656;
}
#filter-menu .checkbox, #filter-menu .radio{
  margin: 10px 30px;
  font-weight: normal;
}

#filter-date {
  margin: 10px;
}

#filter-date .form-group {
  margin-bottom: 15px;
  width:auto;
  display: block;
} 

#filter-date label {
  font-weight: normal;  
  width: 15%;
}

#filter-date .input-group {
  font-weight: normal;  
  width: auto;
}

#filter-signed {
  margin: 10px;
  width:auto;
}

.pagination {
  display: table;
  margin: 15px auto;
}

.document-list .ao-details{
  width: 100%;
}

.document-list li > a {
  display: flex;
}

.document-list li > a > .list-checkbox{
  margin-top: -2px;
  margin-right: 10px;
}
</style>
