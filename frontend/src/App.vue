<template>
  <div id="app">
    <Menu />   
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer/Footer.vue';
import Menu from './components/Menu/Menu.vue';

  export default{

    components: {
    Menu,
    Footer
},
}

</script>

<style lang="scss">

</style>
