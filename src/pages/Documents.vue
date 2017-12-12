<template>
    <div id="wrapper">
        <div class="container-fluid">    
            <div class="row">
              <div class="navbar-default col-md-3 sidebar">
                  <collapse class="navbar-collapse" v-model="sidebarCollapse">
                    <div id="filter-menu">
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
                                        <date-picker v-model="dateFrom" :today-btn="false" :clear-btn="false" :limit-to="dateTo" class="datepicker"></date-picker>
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
                                        <date-picker v-model="dateTo" :today-btn="false" :clear-btn="false" :limit-from="dateFrom" class="datepicker"></date-picker>
                                    </li>
                                </template>
                            </dropdown>
                        </div>
                        <hr>
                        <div class="filter-header">
                            DOH Secretary
                        </div>
                        <div id="filter-signed">
                            <v-select v-model="signedBy" :options="this.$store.state.signList"></v-select>
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
                    <div id = "export-options">
                        <button class="btn btn-default selector-button" id="selectAll" type="button" v-on:click="selectAllDocs()">
                            Select all
                        </button>
                        <button class="btn btn-default selector-button" id="deselectall" type="button" v-on:click="deselectAllDocs()">
                            Deselect all
                        </button>
                        <button class="btn btn-default selector-button"  :disabled="checkedDocs.length === 0" href="#" type="button">
                            Download selected
                        </button>
                    </div>
                    <ul class="nav document-list" id="side-menu">
                        <li v-for="ao in documents" :key="ao.id">
                            <div class="ao-link" v-on:click="clickDocument(ao.id)">
                                <div class="list-checkbox">
                                    <input v-bind:value="ao.id" type="checkbox" v-on:click.stop v-model="checkedDocs">
                                </div>
                                <div class="ao-details">
                                    <div class="pull-right text-right">
                                        {{ ao.date | longdate}}

                                        <div class="hidden-button">
                                            <router-link class="btn btn-default" target="_blank" v-bind:to="{ name:'document', params: { id: ao.id } }" v-on:click.native.stop>
                                                <icon name="external-link"></icon>
                                            </router-link> 
                                        </div>
                                    </div>
                                    <div class="pull-right">
                                        
                                    </div>
                                    <div class="text-primary">{{ ao.doctype }} {{ ao.docnum}}</div>
                                    <div class="small text-muted"> 
                                        {{ ao.sign }}
                                    </div>
                                    <div class="text-success"> 
                                        {{ ao.subject }}
                                    </div>
                                </div>
                            </div>
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
import 'vue-awesome/icons/external-link'

import icon from 'vue-awesome/components/Icon.vue'
import collapse from 'uiv/src/components/collapse/Collapse.vue'
import dropdown from 'uiv/src/components/dropdown/Dropdown.vue'
import pagination from 'uiv/src/components/pagination/Pagination.vue'

import vSelect from 'vue-select'

import datePicker from '@/components/datepicker/DatePicker.vue'

import { getDocuments, getAllDocumentsID } from '@/api/api'

export default {
  components: {
    datePicker,
    icon,
    collapse,
    dropdown,
    pagination,
    vSelect
  },
  props: ['sidebarCollapse'],
  data: function () {
    return {
      documents: [],
      checkedDocs: [],
      searchString: '',
      dateFrom: '',
      dateTo: '',
      signedBy: '',
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
        if (this.dateTo && this.dateFrom > this.dateTo) { // handle overlap
          this[dateObjectName] = ''
        }
      }
    },

    /*
    * Init document list and vue data values
    */
    initDocuments: function () {
      let query = this.getQuery().query
      let currPageTemp = 1

      if (this.$route.query.page) {
        // did not update this.currentpage due to pagination rendering issues
        currPageTemp = parseInt(this.$route.query.page)

        query += 'offset=' + ((currPageTemp - 1) * 10) + '&'
      } else {
        currPageTemp = 1
      }

      this.isLoading = true

      // init documents according to query
      getDocuments(this.searchString, query).then(res => {
        let contentRange = res.headers['content-range']
        let totalCount = parseInt(contentRange.substring(contentRange.indexOf('/') + 1))

        this.documents = res.data
        this.totalPage = Math.ceil(totalCount / this.numDocPerPage)

        this.currentPage = currPageTemp // need to update here so that it's updated with totalpage

        if (totalCount === 0) {
          this.errorMessage = 'No results found'
        } else {
          this.errorMessage = false
        }

        this.isLoading = false
      }).catch(error => {
        console.log(error)
        this.errorMessage = 'There was an error communicating with the server. Please refresh the page.'
        this.isLoading = false
      })
    },

    getQuery: function () {
      let query = ''
      let currPageTemp = 1
      // init vue data values according to query
      if (this.$route.hasOwnProperty('query') && !this.isOldRouteQuery) {
        // sets isOldRouteQuery back to false because it was set in updateResults to true
        this.isOldRouteQuery = false

        if (this.$route.query.dateFrom) {
          this.dateFrom = this.$route.query.dateFrom
          query += 'date=gte.' + this.dateFrom + '&'
        } else {
          this.dateFrom = ''
        }

        if (this.$route.query.dateTo) {
          this.dateTo = this.$route.query.dateTo
          query += 'date=lte.' + this.dateTo + '&'
        } else {
          this.dateTo = ''
        }

        if (this.$route.query.signedBy) {
          this.signedBy = this.$route.query.signedBy
          query += 'sign=ilike.*' + this.signedBy + '*&'
        } else {
          this.signedBy = ''
        }

        if (this.$route.query.ordering) {
          this.sortBy = this.$route.query.ordering

          switch (this.sortBy) {
            case 'date': // oldest
              query += 'order=date.asc' + '&'
              break
            case '-date': // newest
              query += 'order=date.desc' + '&'
              break
          }
        } else {
          this.sortBy = ''
        }

        if (this.$route.query.search) {
          this.searchString = this.$route.query.search
        } else {
          this.searchString = ''
        }
      }

      return {query: query, currPage: currPageTemp}
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
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          signedBy: this.signedBy,
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
    },
    /*
    * Select all documents
    */
    selectAllDocs: function (event) {
      let query = this.getQuery().query

      this.isLoading = true

      getAllDocumentsID(this.searchString, query).then(res => {
        this.checkedDocs = res.data.map(doc => doc.id)
        this.isLoading = false
      }).catch(error => {
        console.log(error)
        this.errorMessage = 'There was an error communicating with the server. Please refresh the page.'
        this.isLoading = false
      })
    },
    /*
    * Deselect or clear all documents in checkedDocs
    */
    deselectAllDocs: function (event) {
      this.checkedDocs = []
    },
    clickDocument: function (doc) {
      this.$router.push({ name: 'document', params: { id: doc } })
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
    '$route': 'initDocuments'
  },
  mounted: function () {
    this.initDocuments()
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

.hidden-button {
  visibility: hidden;
}

.document-list .ao-details {
  width: 100%;
}

.document-list .ao-link {
  cursor: pointer;
  padding: 10px 15px
}

.document-list .ao-link:hover{
  background-color: #eee;
}

.document-list .ao-link:hover .hidden-button {
  visibility: visible;
}


.document-list li > div {
  display: flex;
}

.document-list li > div > .list-checkbox {
  margin-top: -2px;
  margin-right: 10px;
}

#export-options {
  margin-bottom: 15px;
}

#filter-signed ul.dropdown-menu {
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow-x: hidden;
}

#filter-signed ul.dropdown-menu *{
  text-overflow: ellipsis;
  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow-x: hidden;
}
</style>
