<template>
  <div class="search-wrapper">
    <ul class="nav document-list" id="side-menu">
        <li v-for="ao in aoDocuments" :key="ao.pk">
						<router-link v-bind:to="{ name:'document', params: { id: ao.pk } }">
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
            </router-link>
        </li>
    </ul>

    <pagination v-model="currentPage" :total-page="totalPage" :max-size="maxSize" :size="'sm'" :boundary-links="true" :direction-links="false"></pagination>
  </div>
</template>

<script>
import pagination from 'uiv/src/components/pagination/Pagination.vue'
import { getDocuments } from '@/api/api'

export default {
  components: {
    pagination
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
      maxSize: 10, // used for pagination
      totalPage: 0, // used for pagination
      numDocPerPage: 10,
      isLoading: false
    }
  },
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
.pagination {
  display: table;
  margin: 15px auto;
}

.document-list li > a {
  display: flex;
}

.document-list li > a > .list-checkbox{
  margin-top: -2px;
  margin-right: 10px;
}
</style>