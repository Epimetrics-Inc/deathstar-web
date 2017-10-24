<template>
  <div class="search-wrapper">
    <div class="sidebar-search">
        <div class="sidebar-search-options">
            <div class="has-feedback has-feedback-left search-option">
                <input type="text" class="form-control" placeholder="Search..." v-model.lazy="searchString"/>
                <icon class="form-control-feedback" name="search"></icon>
            </div>
            <button class=" btn btn-default search-option icon-button" type="button" v-on:click="openModal()" id="filter-button">
                <icon name="filter"></icon>
            </button>
            <div v-if="isDocActive == 'true'">
                <button class=" btn btn-default search-option icon-button" type="button" id="upload-button">
                    <icon name="plus"></icon>
                </button>
            </div>
        </div>
        
        <transition name="fade">
            <div id = "export-options" v-show="checkedAOs.length > 0">
                <button v-on:click="selectAllDocs()" class="btn btn-default selector-button" id="selectAll" type="button">
                    Select all
                </button>
                <button v-on:click="deselectAllDocs()" class="btn btn-default selector-button" id="deselectall" href="#" type="button">
                    Deselect all
                </button>
                    <button v-on:click="downloadDocs()" v-if="isDocActive == 'true'" class="btn btn-default search-option export-button icon-button" type="button">
                        <icon name="download"></icon>
                    </button>
            </div>
        </transition>
    </div>
    
    <ul class="nav document-list" id="side-menu">
        <li v-for="ao in aoDocuments" :key="ao.pk">
            <a v-on:click="clickDocument(ao.pk)">
                <div class="list-checkbox">
                    <input v-bind:value="ao.pk" type="checkbox" v-model="checkedAOs">
                </div>
                <div>
                    <div>{{ ao.doctype }} {{ ao.docnum}}</div>
                    <div class="list-title text-muted"> 
                        <!-- {{ ao.docTitle }} -->
                        {{ ao.subject }}
                    </div>
                </div>
            </a>
        </li>
    </ul>

    <pagination v-model="currentPage" :total-page="totalPage" :max-size="maxSize" :size="'sm'" :boundary-links="true" :direction-links="false"></pagination>

    <modal v-model="isModalOpen" title="Search options" class="modal-wrapper" :backdrop="false">
        <div slot="footer">
            <button type="button" class="btn btn-default" v-on:click="cancelModal()">Cancel</button>
            <button type="button" class="btn btn-default" v-on:click="revertModal()">Revert</button>
            <button type="button" class="btn btn-default" v-on:click="okModal()">OK</button>
        </div>

        <div class="modal-custom-header">
            Themes
        </div>
        <button class=" btn btn-default btn-xs" type="button" v-on:click="selectAllThemes()">
            Select all
        </button>
        <button class=" btn btn-default btn-xs" type="button" v-on:click="deselectAllThemes()">
            Deselect all
        </button>
        <div id="filter-themes">
            <label class="checkbox-inline" v-for="filter in filters">
                <input type="checkbox" v-bind:value="filter" v-model="filterModalTemp.checkedFilters">
                {{ filter }}
            </label>
        </div>
        <hr>

        <div class="modal-custom-header">Sort by</div>
        <div id="filter-sort">
            <label class="radio-inline">
                <input type="radio" v-model="filterModalTemp.sortBy" value = "newest">
                Date (newest)
            </label>
            <label class="radio-inline">
                <input type="radio" v-model="filterModalTemp.sortBy" value = "oldest">
                Date (oldest)
            </label>
            <label class="radio-inline">
                <input type="radio" v-model="filterModalTemp.sortBy" value = "relevance" disabled>
                Relevance
            </label>
        </div>
        
        <hr>
        <div class="modal-custom-header">Date signed</div>
        <div class="form-inline">
            <!-- datefrom dropdown + date-picker -->
            <dropdown class="form-group" id="filter-date-from">
                <label for="datefrom">From </label>
                <div class="input-group" id="datefrom">
                    <input class="form-control" type="text" v-model.lazy="filterModalTemp.dateFrom">
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="button" data-role="trigger">
                            <icon name="calendar"></icon>
                        </button>
                    </div>
                </div>
                <template slot="dropdown">
                    <li>
                        <date-picker v-model="filterModalTemp.dateFrom" :today-btn="false" :clear-btn="false" class="datepicker"></date-picker>
                    </li>
                </template>
            </dropdown>
            <!--/ datefrom dropdown + date-picker -->
            
            <!-- dateto dropdown + date-picker -->
            <dropdown class="form-group" id="filter-date-from">
                <label for="dateTo">To: </label>
                <div class="input-group" id="dateto">
                    <input class="form-control" type="text" v-model.lazy="filterModalTemp.dateTo">
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="button" data-role="trigger">
                            <icon name="calendar"></icon>
                        </button>
                    </div>
                </div>
                <template slot="dropdown">
                    <li>
                        <date-picker v-model="filterModalTemp.dateTo" :today-btn="false" :clear-btn="false" class="datepicker"></date-picker>
                    </li>
                </template>
            </dropdown>
            <!--/ dateto dropdown + date-picker -->
        </div>
        <hr>
        <div class="modal-custom-header">Signed by</div>
        <div>
          <input class="form-control" type="text" v-model="filterModalTemp.signedBy">
        </div>
    </modal>
    <div class="overlay" v-show="isLoading">
      <icon name="spinner" pulse></icon>
    </div>
  </div>
</template>

<script>
// icon imports
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/filter'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/download'
import 'vue-awesome/icons/calendar'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/refresh'

import dropdown from 'uiv/src/components/dropdown/Dropdown.vue'
import modal from 'uiv/src/components/modal/Modal.vue'
import pagination from 'uiv/src/components/pagination/Pagination.vue'
import icon from 'vue-awesome/components/Icon.vue'

import datePicker from '@/components/datepicker/DatePicker.vue'
import { getDocuments } from '@/api/api'

export default {
  components: {
    dropdown,
    modal,
    datePicker,
    pagination,
    icon
  },
  data: function () {
    return {
      aoDocuments: [],
      checkedAOs: [],
      isModalOpen: false,
      filters: [
        'Adolescent Health',
        'Geriatric Health',
        'MNCHN',
        'Special Population'
      ],
      filterModal: {
        dateFrom: '',
        dateTo: '',
        signedBy: '',
        checkedFilters: [],
        sortBy: 'oldest'
      },
      filterModalTemp: {},
      searchString: '',
      currentPage: 1, // used for pagination
      maxSize: 4, // used for pagination
      totalPage: 0, // used for pagination
      numDocPerPage: 10,
      isLoading: false
    }
  },
  props: ['isDocActive'],
  methods: {
    selectAllDocs: function (event) {
      this.checkedAOs = []
      for (let ao of this.aoDocuments) {
        this.checkedAOs.push(ao.pk)
      }
    },
    deselectAllDocs: function (event) {
      this.checkedAOs = []
    },
    selectAllThemes: function (event) {
      if (this.filters.length !== this.filterModalTemp.checkedFilters.length) {
        this.filterModalTemp.checkedFilters = []
        for (let filter of this.filters) {
          this.filterModalTemp.checkedFilters.push(filter)
        }
      }
    },
    deselectAllThemes: function (event) {
      this.filterModalTemp.checkedFilters = []
    },
    downloadDocs: function (event) {
      this.deselectAllDocs()
      alert('Document download')
    },
    validateDate: function (dateObjectName) {
      var date = new Date(this.filterModal[dateObjectName])
      var year
      var month
      var day

      if (isNaN(date)) {
        this.filterModal[dateObjectName] = ''
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
    updateQuery: function () {
      var order

      switch (this.filterModal.sortBy) {
        case 'newest':
          order = '-date'
          break
        default:
          order = 'date'
          break

        // todo: handle order by relevance
      }
      this.queryGetDocuments({
        'search': this.searchString,
        'ordering': order
      })
      this.currentPage = 1
    },
    clickDocument: function (document) {
      this.$emit('clickDocument', document)
    },
    queryGetDocuments: function (query) {
      this.isLoading = true

      getDocuments(query).then(res => {
        this.isLoading = false
        this.aoDocuments = res.data.results
        this.totalPage = Math.ceil(parseInt(res.data.count) / this.numDocPerPage)
      }).catch(error => {
        this.isLoading = false
        console.log(error)
        this.$emit('error')
      })
    },
    openModal: function () {
      this.isModalOpen = true
      this.filterModalTemp = JSON.parse(JSON.stringify(this.filterModal)) // copies filtermodal to temp
    },
    okModal: function () {
      this.filterModal = JSON.parse(JSON.stringify(this.filterModalTemp)) // copies temp to filtermodal
      this.isModalOpen = false
      this.updateQuery()
    },
    cancelModal: function () {
      this.isModalOpen = false
    },
    revertModal: function () {
      this.filterModalTemp = JSON.parse(JSON.stringify(this.filterModal)) // copies filtermodal to temp
    }
  },
  watch: {
    searchString: function () {
      this.updateQuery()
    },
    dateFrom: function () {
      this.validateDate('dateFrom')
    },
    dateTo: function () {
      this.validateDate('dateTo')
    },
    currentPage: function () {
      this.maxSize = this.currentPage >= 995 ? 3 : 4 // update max size
      this.queryGetDocuments({page: this.currentPage, search: this.searchString})
    }
  },
  mounted: function () {
    for (let filter of this.filters) { // initialize to check all filters
      this.filterModal.checkedFilters.push(filter)
    }
    this.queryGetDocuments()
  }
}
</script>

<style>
.sidebar-nav .search-wrapper{
  margin: 0px;
  height: inherit;
  display: flex;
  flex-direction: column;
  min-height: 50px;
}

.sidebar-search {
  margin-right:15px;
  margin-left:15px;
  margin-top:15px;
  margin-bottom:15px;
}

.search-wrapper > ul {
  overflow-y:auto;  
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  height:inherit;
}

.search-wrapper .modal-wrapper {
  margin:0;
}

.search-wrapper .document-list a{
  cursor: pointer;
}

.search-wrapper .pagination {
  display: table;
  margin: 15px auto;
}

.overlay .fa-icon {
  height: 100%;
  width: 40%;
}

/* Filter modal */
.modal-backdrop{
  display:none;
}

.modal-dialog{
  margin: 60px auto;
}

.modal-custom-header{
  font-weight:bold;
  font-size:15px;
  color: #333;
}

.modal-dialog .checkbox-inline, .modal-dialog .radio-inline{
  margin:0px 15px;
}

.datepicker{
  padding-left:15px;
  padding-right:15px;
}

/* End of Filter modal */

#export-options .export-button{
  float:right;
}
</style>