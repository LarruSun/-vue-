<template>
  <div id="app">
      <!-- <img src="./assets/logo.png"> -->
      <router-view></router-view>
      
      <NavBar></NavBar>
      <!-- <router-view/> -->
  </div>
</template>

<script>
import NavBar from '@/components/public/NavBar';
import'reset-css/reset.css';

export default {
  // name: 'App',
  components:{
    NavBar
  }
}
</script>

<style>
@import 'reset-css/reset.css';
  
</style>
