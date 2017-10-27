<template>
  <div id="wrapper">
    <navheader></navheader>
    <div class="huge text-center error-page">
      Error 404
      <br>
      Are you lost? Page youre looking for does not exist
    </div>
  </div>
</template>

<script>
import navheader from '@/components/navheader'

export default {
  components: {
    navheader
  }
}
</script>

<style>
.error-page {
  padding:50px;
  position:relative;
}

</style>