<template>

    <div class="content">

        <h2>Seja bem-vindo ao QuickNotes</h2>

        <ButtonCreateAnotation :name="name"/>

    </div>
</template>

<script>
import { defineComponent } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css'
import ButtonCreateAnotation from '@/components/Button/ButtonCreateAnotation.vue';

    export default defineComponent({
        name: 'Index',
        components: {
            ButtonCreateAnotation
        },

        data(){
            return{
                name: "Criar anotação"
            }
        }
    })


</script>

<style src="./style.scss"  lang="scss" />