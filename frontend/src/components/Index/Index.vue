<template>

    <div class="content">

        <h2>Seja bem-vindo ao QuickNotes</h2>

        <button  class="btn_create_new"  v-on:click="OpenForm">Criar anotação</button>

    </div>

   

    <div class="form" v-if="open_form">

        <div class="form-content">

            <i @click="closeForm" id="fa-solid-li"  class="fa-solid fa-circle-xmark"></i>

            <textarea v-model="subject"  placeholder="Sua anotação"></textarea>
            <input  v-model="potential" placeholder="Potencial de Negocio">

            <select v-model="category">
                <option value="0">Pouco importate</option>
                <option value="1">Importante</option>
                <option value="2">Muito importante</option>
            </select>
            
            <input  v-model="term" type="text" placeholder="Data">
            <button  class="btn_salvar"  v-on:click="submitForm">Salvar</button>

        </div>

    </div>
   

</template>

<script>
import { defineComponent } from 'vue';
import api, { getToken } from '@/services/api';
import '@fortawesome/fontawesome-free/css/all.css'

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

            closeForm(){
                this.open_form = false;
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

<style src="./style.scss"  lang="scss" />