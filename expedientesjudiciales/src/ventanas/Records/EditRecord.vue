<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>Edit Record</h2>
      <form @submit.prevent="updateRecord">
        <div class="form-group">
          <label>ID Record</label>
          <input type="text" v-model="editableRecord.id" readonly />
        </div>

        <div class="form-group">
          <label>Case</label>
          <input type="text" v-model="editableRecord.caso" required />
        </div>

        <div class="form-group">
          <label>Judge</label>
          <input type="text" v-model="editableRecord.juez" required />
        </div>

        <div class="form-group">
          <label>Date</label>
          <input type="date" v-model="editableRecord.fecha" required />
        </div>

        <div class="form-group">
          <label>Priority</label>
          <select v-model="editableRecord.prioridad" required>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div class="form-group">
          <label>Participants</label>
          <div v-for="(participant, index) in editableRecord.participantes" :key="index" class="participant">
            <input type="text" placeholder="Name" v-model="participant.nombre" required />
            <input type="text" placeholder="Role" v-model="participant.rol" required />
            <button type="button" @click="removeParticipant(index)">⛔</button>
          </div>
          <button type="button" class="btn-add-participant" @click="addParticipant">Add Participant</button>
        </div>

        <div class="form-group">
          <label>Document</label>
          <select v-model="editableRecord.documentoSeleccionado">
            <option disabled value="">Select a Document</option>
            <option v-for="doc in userDocuments" :key="doc.id" :value="doc.id">
              {{ doc.name }} ({{ doc.id }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Status</label>
          <select v-model="editableRecord.estado" required>
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary">Save</button>
          <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    show: { type: Boolean, required: true },
    record: { type: Object, required: true },
    userId: { type: String, required: true }, // Cambia a userId en lugar de userEmail
  },

  data() {
    return {
      editableRecord: { ...this.record },
      userDocuments: [], // Lista de documentos filtrados por email
    };
  },
  watch: {
    record(newRecord) {
      this.editableRecord = { ...newRecord };
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addParticipant() {
      this.editableRecord.participantes.push({ nombre: "", rol: "" });
    },
    removeParticipant(index) {
      this.editableRecord.participantes.splice(index, 1);
    },
    async fetchUserDocuments() {
      try {
        console.log("Fetching documents for userId:", this.userId); // Depuración
        const response = await axios.get(`https://servermygestorrw-production.up.railway.app/api/documents/user-documents?userId=4545`);//${this.userId}
        this.userDocuments = response.data.documents;
        console.log("Documents fetched:", this.userDocuments); // Depuración
      } catch (error) {
        console.error("Error fetching user documents:", error.message);
        this.userDocuments = [];
      }
    },



    async updateRecord() {
      try {
        const payload = {
          ...this.editableRecord,
          documentoSeleccionado: this.editableRecord.documentoSeleccionado,
        };

        await axios.put(`https://servermygestorrw-production.up.railway.app/api/record/${this.editableRecord.firebaseId}`, payload);

        this.$emit("save", this.editableRecord);
        this.closeModal();
      } catch (error) {
        console.error("Error updating record:", error.message);
        alert("Failed to update record. Please try again.");
      }
    },
  },
  mounted() {
    console.log("User ID recibido como prop:", this.userId);
    this.fetchUserDocuments();
  },

};
</script>

  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto; /* Asegura el scroll en pantallas pequeñas */
    z-index: 1000;

  }
  
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%; /* Reduce el tamaño para adaptarlo a pantallas pequeñas */
    max-width: 500px; /* Limita el ancho máximo del modal */
    max-height: 80vh; /* Limita la altura máxima del modal */
    overflow-y: auto; /* Habilita el scroll vertical si el contenido excede */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
  
  .participant {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    width: 100%;
  }
  
  .btn-primary {
    background-color: #f47935;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-secondary {
    background-color: #346ac1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    .modal-content {
      width: 100%; /* Asegura que el modal ocupe todo el ancho en pantallas pequeñas */
      padding: 1rem;
    }
  }
  </style>
  