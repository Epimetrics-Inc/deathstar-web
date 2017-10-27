<template>
  <div id="app">
	  <transition name="page">
  			<router-view/>
		</transition>
    <navfooter></navfooter>
  </div>
</template>

<script>
import navfooter from '@/components/navfooter'

export default {
  name: 'app',
  components: {
    navfooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
