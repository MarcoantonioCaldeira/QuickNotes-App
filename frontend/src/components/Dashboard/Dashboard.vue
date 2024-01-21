<template>
  <div class="Inicio">
    <h1>Anotações</h1>

    <div class="AllContent">
      
        <div class="Content"  v-for="anotation in anotations" :key="anotation.id_anotation">

          <div class="actions">
            <i @click="editAnotation(anotation)" class="fa-solid fa-pen-to-square"></i>
            <i @click="OpenMessage(anotation)" class="fa-solid fa-trash-can"></i>
          </div>

          <h3>{{ anotation.subject }}</h3>
          <!-- {{ anotation.potential }}
          {{ anotation.category }}
          {{ anotation.term }} -->

          <div v-if="anotation.showDeleteConfirmation">
            <h2>Tem certeza que deseja excluir a anotação</h2>
            <button class="btn_delete_anotation" @click="deleteAnotation(anotation.id_anotation)">Sim</button>
          </div>
        </div>
      
    </div>

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
import '@fortawesome/fontawesome-free/css/all.css';

export default defineComponent({
  name: 'Dashboard',

  data() {
    return {
      anotations: [],
      editMode: false,
      selectedAnotation: { showDeleteConfirmation: false },
      editedAnotation: {
        subject: "",
        potential: "",
        category: "",
        term: "",
      },
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    OpenMessage(anotation) {
     this.selectedAnotation = anotation;
      this.selectedAnotation.showDeleteConfirmation = true;
    },

    async getData() {
      try {

        const token = await getToken();

        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.get('/anotations/list', { headers });

        this.anotations = response.data.map(anotation => ({ ...anotation, showDeleteConfirmation: false }));

      } catch (error) {
        console.error(error);
        alert("Erro ao buscar as anotações");
      }
    },

    async editAnotation(anotation) {
      this.editMode = true;
      this.editedAnotation = { ...anotation };
    },

    cancelEdit() {
      this.editMode = false;
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

        this.getData();

      } catch (error) {

        console.error(error);
        alert('Erro ao atualizar a anotação');

      }
    },

    async deleteAnotation(id) {
      try {
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const response = await api.delete(`/anotations/delete/${id}`, { headers });

        this.anotations = this.anotations.filter(anotation => anotation.id_anotation !== id);
      
        this.$router.push({ name: 'Index' });
        return response.data;

      } catch (error) {

        console.log(error);
        alert("Erro ao deletar a anotação");
      }
    },
  },
});
</script>

<style  src="./style.scss"  lang="scss"/>
