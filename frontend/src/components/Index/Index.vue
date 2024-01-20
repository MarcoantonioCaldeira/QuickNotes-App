<template>

    <h1>seja bem-vindo ao QuickNotes</h1>

    <h2>Criar nova anotações</h2>

    <button v-on:click="OpenForm">Criar nova anotaçao</button>

    <div class="form" v-if="open_form">

        <textarea v-model="subject"  placeholder="Conteudo"></textarea>
        <input  v-model="potential" placeholder="Potencial de Negocio">
        <select v-model="category">
            <option value="0">Pouco importate</option>
            <option value="1">Importante</option>
            <option value="2">Muito importante</option>
        </select>
        <input  v-model="term" type="text" placeholder="Data">
        <button v-on:click="submitForm">Salvar</button>
        
    </div>

</template>

<script>
import { defineComponent } from 'vue';
import api, { getToken } from '@/services/api';

    export default defineComponent({
        name: 'Index',

        data() {
            return {
                open_form: false,
                subject: "",
                potential: "",
                category: "",
                term: "",
            }
        },

        methods:{
            OpenForm(){
                this.open_form = true;
            },


            async submitForm(){

                try{

                    const token = await getToken();
                    const headers = { Authorization: `Bearer ${token}` };

                    const data = {
                        subject: this.subject,
                        potential: Number(this.potential),
                        category: this.category,
                        term: this.term,
                    }
          
                    const response = await api.post('/anotations/create/', data, {headers})     

                    console.log(response.data);

                    alert("Anotação criada com sucesso");

                    this.open_form = false;
                    this.subject = "";
                    this.potential = "";
                    this.category = "";
                    this.term = "";

                }catch(error){
                    console.log(error);
                }
            }
        }
    })


</script>