<template>

    <h1>seja bem-vindo ao QuickNotes</h1>

    <h2>Criar nova anotações</h2>

    <button v-on:click="OpenForm">Criar nova anotaçao</button>

    <div class="form" v-if="open_form">

        <textarea placeholder="Conteudo"></textarea>
        <input type="text" placeholder="Potencial de Negocio">
        <select>
            <option value="0">Pouco importate</option>
            <option value="1">Importante</option>
            <option value="2">Muito importante</option>
        </select>
        <input type="text" placeholder="Data">
        <button>Salvar</button>
        
    </div>

</template>

<script>
import { defineComponent } from 'vue';


    export default defineComponent({
        name: 'Index',

        data() {
            return {
                open_form: false
            }
        },

        methods:{
            OpenForm(){
                this.open_form = true;
            }
        }
    })


</script>