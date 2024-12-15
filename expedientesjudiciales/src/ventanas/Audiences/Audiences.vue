<template>
    <div class="audiences-container">
      <h2>Audiences for Record: {{ recordDocumentId }}</h2>
  
      <!-- Botón para agregar nueva audiencia -->
      <div class="actions">
        <button class="btn-primary" @click="openNewAudienceModal">New Audience</button>
      </div>
  
      <!-- Tarjetas de audiencias -->
      <div class="audience-cards">
        <div v-for="audience in audiences" :key="audience.id" class="audience-card">
          <h3>Audience</h3>
          <p><strong>Date:</strong> {{ audience.fecha }}</p>
          <p><strong>Time:</strong> {{ audience.hora }}</p>
          <p><strong>Judge:</strong> {{ audience.juez }}</p>
          <p><strong>Participants:</strong></p>
          <ul>
            <li v-for="(participant, index) in audience.participantes" :key="index">
              {{ participant.nombre }} - {{ participant.rol }}
            </li>
          </ul>
          <p><strong>Status:</strong> {{ audience.estado }}</p>
          <p><strong>Expedients:</strong></p>
          <ul>
            <li v-for="(expedient, index) in audience.expedientes" :key="index">
              {{ expedient }}
            </li>
          </ul>
          <p><strong>Description:</strong> {{ audience.descripcion }}</p>
          <p><strong>Act:</strong> <a :href="audience.actaUrl" target="_blank">{{ audience.actaUrl }}</a></p>
          <div class="actions">
            <button class="btn-edit" @click="editAudience(audience)">✏️</button>
            <button class="btn-delete" @click="deleteAudience(audience.id)">🗑️</button>
          </div>
        </div>
      </div>
  
      <!-- Modal para nueva audiencia -->
      <NewAudience
        v-if="showNewAudienceModal"
        :show="showNewAudienceModal"
        :recordId="recordId"
        @close="closeNewAudienceModal"
        @save="fetchAudiences"
      />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import NewAudience from "./NewAudience.vue";
  
  export default {
    components: {
      NewAudience,
    },
    data() {
      return {
        recordId: this.$route.params.recordId,
        audiences: [],
        showNewAudienceModal: false,
        recordDocumentId: "", // ID del documento del record
      };
    },
    methods: {
      async fetchAudiences() {
        try {
          const response = await axios.get(`http://localhost:5000/api/audience/${this.recordId}`);
          this.audiences = response.data;
        } catch (error) {
          console.error("Error fetching audiences:", error.response?.data || error.message);
        }
      },
      openNewAudienceModal() {
        this.showNewAudienceModal = true;
      },
      closeNewAudienceModal() {
        this.showNewAudienceModal = false;
      },
      async deleteAudience(audienceId) {
        try {
          await axios.delete(`http://localhost:5000/api/audience/${this.recordId}/${audienceId}`);
          this.audiences = this.audiences.filter((audience) => audience.id !== audienceId);
          alert("Audience deleted successfully.");
        } catch (error) {
          console.error("Error deleting audience:", error.response?.data || error.message);
          alert("Failed to delete audience. Try again.");
        }
      },
      editAudience(audience) {
        console.log("Edit Audience:", audience);
        // Lógica para editar la audiencia
      },
    },
    mounted() {
      this.fetchAudiences();
    },
  };
  </script>
  
  <style scoped>
  .audiences-container {
    padding: 2rem;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
  
  .audience-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .audience-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    width: 300px;
    background-color: #f9f9f9;
  }
  
  .audience-card h3 {
    margin-top: 0;
  }
  
  .actions button {
    margin-top: 0.5rem;
  }
  </style>
  