<template>
  <div id="app">
    <Menu />   
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu/Menu.vue';

  export default{

    components: {
        Menu
    },
}

</script>

<style lang="scss">

</style>
