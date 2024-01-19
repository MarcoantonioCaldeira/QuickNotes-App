<template>
  <div class="Inicio">
    <h1>Recent anotations</h1>

    <ul>
      <li v-for="anotation in anotations" key="anotation.id_anotation">
        {{ anotation.id_anotation }}
        {{ anotation.subject }}
        {{ anotation.potential }}
        {{ anotation.category }}
        {{ anotation.term }}
        <button @click="editAnotation(anotation)">Editar</button>
        <button v-on:click="deleteAnotation(anotation.id_anotation)">Excluir Anotação</button>
      </li>
    </ul>


    <div v-if="editMode">
      <h2>Editar Anotação</h2>

      <form @submit.prevent="updateAnotation">
        <textarea v-model="editedAnotation.subject"></textarea>
        <textarea v-model="editedAnotation.potential"></textarea>
        <textarea v-model="editedAnotation.category"></textarea>
        <textarea v-model="editedAnotation.term"></textarea>
        <button type="submit">Salvar</button>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>

    

  </div>
</template>

<script>
import api, { getToken } from '@/services/api';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Dashboard',

  data(){
    return{
      anotations: [],
      editMode: false,
      editedAnotation:{
        subject: "",
        potential: "",
        category: "",
        term: "",
      }
  
    }
  },

  mounted(){
    this.getData();
  },

  methods: {

    async getData(){

      try{

        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const response = await api.get('/anotations/list', {headers });

        this.anotations = response.data;

      }catch(error){
        console.log(error);
        alert("Erro ao buscar as anotações");
      };  
    },



    async editAnotation(anotation) { 
      this.editMode = true;
      this.editedAnotation = { ...anotation };
    },

    async updateAnotation() {
      try {
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const response = await api.patch(`/anotations/update/${this.editedAnotation.id_anotation}`, this.editedAnotation, { headers });

        console.log(response.data);
        alert('Anotação atualizada com sucesso!');

        this.editMode = false;
        this.editedAnotation = {
          subject: "",
          potential: "",
          category: "",
          term: "",
        };

        // Atualizar a lista de anotações
        this.getData();
      } catch (error) {
        console.error(error);
        alert('Erro ao atualizar a anotação');
      }
    },


    async deleteAnotation(id){
        
        try{
  
          const token = await getToken();
          const headers = { Authorization: `Bearer ${token}` };
  
          const response = await api.delete(`/anotations/delete/${id}`, {headers });
  
          this.anotations = this.anotations.filter(anotation => anotation.id_anotation !== id)

          return response.data; 
  
        }catch(error){
          console.log(error);
          alert("Erro ao deletar a anotação");
        };  
      }



    }

})

</script>


<style scoped>

</style>
