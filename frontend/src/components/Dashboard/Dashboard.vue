<template>
  <!-- Dashboard que exibe todas as anotações -->
  <div class="Inicio">
    
    <h1>Anotações</h1>

    <div class="AllContent">
      
      <div class="Content"  v-for="anotation in anotations" :key="anotation.id_anotation">


        <div class="actions">
          <i @click="toggleFavorite(anotation)" :id="'star-icon-' + anotation.id_anotation" class="fa-solid fa-star"></i>
          <i @click="editAnotation(anotation)" class="fa-solid fa-pen-to-square"></i>
          <i @click="OpenMessage(anotation)" class="fa-solid fa-trash-can"></i>
        </div>

        <h3>{{ anotation.subject }}</h3>
        <h4>Valor potencial: {{ anotation.potential }}</h4>
        <h4>Categoria: {{ anotation.category }}</h4>
        <h4>Data: {{ anotation.term }}</h4>


        <div class="form_cancel" v-if="anotation.showDeleteConfirmation">
          <div class="form_content_cancel animate" style="height: 400px;">

            <i style="margin-top: -120px;"  @click="cancelDeletion" id="fa-solid-li"  class="fa-solid fa-circle-xmark"></i>

            <h2>Tem certeza que deseja excluir a anotação</h2>
            <button class="btn_delete_anotation" @click="deleteAnotation(anotation.id_anotation)">Sim</button>

          </div>

        </div>

      </div>

      <div class="Btn_Add_Area" style="margin-left: -60px;">
        <ButtonCreateAnotation :name="name"/>
      </div>
     
 
    </div>

    <!-- Formualrio de Edição -->
    <div class="form_edit"  v-if="editMode">

      <div class="form-content-edit animate">

        <i @click="cancelEdit" id="fa-solid-li"  class="fa-solid fa-circle-xmark"></i>
  
          <textarea v-model="editedAnotation.subject"></textarea>
          <input  type="number" placeholder="Potencial de Negocio" v-model="editedAnotation.potential" />

          
          <label>Categoria: </label>
          <select v-model="editedAnotation.category">
              <option value="0">Pouco importate</option>
              <option value="1">Importante</option>
              <option value="2">Muito importante</option>
          </select>
          
          <input type="date"  v-model="editedAnotation.term" />

          <button v-on:click="updateAnotation" class="btn_save_edition" type="submit">Salvar</button>

      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import api, { getToken } from '@/services/api';
import '@fortawesome/fontawesome-free/css/all.css';
import { formatData, formatMoney } from '../../masks/masks.ts';
import ButtonCreateAnotation from '@/components/Button/ButtonCreateAnotation.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    ButtonCreateAnotation,
  },

  data() {
    return {
      anotations: [{ isFavorite: false }],
      editMode: false,
      category: "",
      selectedAnotation: { showDeleteConfirmation: false },
      name: "Nova anotação",
      editedAnotation: {
        subject: "",
        potential: "",
        category: "",
        term: "",
      }
    };
  },

  //Com o mounted, a função getData é chamada assim que a página é carregada
  mounted() {
    this.getData();
  },

  methods: {


    //Função para buscar as anotações
    async getData() {
      try {

        const token = await getToken();

        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.get('/anotations/list', { headers });
        

        this.anotations = response.data
        .map(anotation => ({ ...anotation, showDeleteConfirmation: false, term: formatData(anotation.term),  potential: formatMoney(anotation.potential)}))
        .sort((a, b)  => {
          const importanciaA = parseInt(a.category);
          const importanciaB = parseInt(b.category);
          return importanciaB - importanciaA; 
        })

        //Verificação do tipo de categoria e troca pela pelavra
        this.anotations.forEach(anotation => {

          if (anotation.category === "0") {
            anotation.category = "Pouco Importante";

          } else if (anotation.category === "1") {
            anotation.category = "Importante";

          } else if (anotation.category === "2") {
            anotation.category = "Muito Importante";

          } 

        });

      } catch (error) {
        console.error(error);
        alert("Erro ao buscar as anotações");
      }
    },



    //Função para editar a anotação
    async editAnotation(anotation) {
      this.editMode = true;
      this.editedAnotation = { ...anotation };
    },

    //Controle de exibição do modal de edição
    cancelEdit() {
      this.editMode = false;
    },

    //Função que vai enviar os dados editados para a api
    async updateAnotation() {
      try {
      
        const { showDeleteConfirmation, ...dataToSend } = this.editedAnotation;
    
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };
      
        const response = await api.patch(`/anotations/update/${dataToSend.id_anotation}`, dataToSend, { headers });
        console.log(response.data);

        this.editMode = false;

        this.editedAnotation = {
          id_anotation: "",
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

    //Função para abrir o modal de confirmação de exclusão
    OpenMessage(anotation) {
      this.selectedAnotation = anotation;
      this.selectedAnotation.showDeleteConfirmation = true;
    },

    //Função para fechar o modal de confirmação de exclusão
    cancelDeletion() {
      this.selectedAnotation.showDeleteConfirmation = false;
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

    //Alterar a cor do icone quando for favorito
    toggleFavorite(anotation) {
      anotation.isFavorite = !anotation.isFavorite;
      const icon = document.getElementById(`star-icon-${anotation.id_anotation}`);
      icon.style.color = anotation.isFavorite ? "#FFD700" : "black";
    }




  }
});
</script>

<style  src="./style.scss"  lang="scss"/>
