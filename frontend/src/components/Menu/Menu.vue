<template>
    <div class="menu">
        <h1>QuickNotes</h1>
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Menu',
})

</script>