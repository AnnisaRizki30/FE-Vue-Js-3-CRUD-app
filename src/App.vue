<template>
  <div class="app" style="background: rgb(255, 255, 255);">
   <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header.vue'
export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
#app {
  background: #FDF5E9;
}
</style>
