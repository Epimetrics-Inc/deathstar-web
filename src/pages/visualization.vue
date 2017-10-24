<template>
		<div id="wrapper">
		</div>
</template>

<script>
import 'vue-awesome/icons/spinner'

import navheader from '@/components/navheader.vue'
import navsearch from '@/components/navsearch.vue'
import collapse from 'uiv/src/components/collapse/Collapse.vue'
import icon from 'vue-awesome/components/Icon'

import { getVisualization } from '@/api/gitresource'

export default {
  components: {
    navheader,
    navsearch,
    collapse,
    icon
  },
  props: ['sidebarCollapse'],
  data: function () {
    return {
      isError: false,
      filters: [
        {
          full: 'Adolescent Health',
          id: 'adolescent'
        },
        {
          full: 'Geriatric Health',
          id: 'geriatric'
        },
        {
          full: 'MNCHN',
          id: 'mnchn'
        },
        {
          full: 'Special Population',
          id: 'specpop'
        }
      ],
      themeOne: 'adolescent',
      themeTwo: 'geriatric',
      vizURL: false,
      isVizLoading: false
    }
  },
  methods: {
    clickVisualization: function () {
      this.isVizLoading = true
      this.vizURL = getVisualization(this.themeOne, this.themeTwo)
    }
  }
}
</script>

<style>
/*Start of Visualisation Sidebar*/
.sidebar .sidebar-vis-options {
  margin-bottom: 0;
}

.sidebar .sidebar-vis-options *:last-child{
  margin-bottom:0;
}

.sidebar .sidebar-vis-options .form-group > label {
  width:28%;
}

.sidebar .sidebar-vis-options .form-group > select {
  width:70%;
}

.sidebar .visualize-button{
  float:right;
}

.overlay .fa-icon {
  height: 100%;
  width: 20%;
}

.viz-wrapper {
  position: relative;
}

.viz-preview {
  width:100%;
  height:85vh;
  background:white;
}
/*End of Visualisation Sidebar*/
</style>
