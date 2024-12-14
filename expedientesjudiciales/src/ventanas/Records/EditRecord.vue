<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>Edit Record</h2>
        <form @submit.prevent="updateRecord">
          <div class="form-group">
            <label for="id">ID Record</label>
            <input type="text" v-model="editableRecord.id" readonly />
          </div>
  
          <div class="form-group">
            <label for="caso">Case</label>
            <input type="text" v-model="editableRecord.caso" required />
          </div>
  
          <div class="form-group">
            <label for="juez">Judge</label>
            <input type="text" v-model="editableRecord.juez" required />
          </div>
  
          <div class="form-group">
            <label for="fecha">Date</label>
            <input type="date" v-model="editableRecord.fecha" required />
          </div>
  
          <div class="form-group">
            <label for="prioridad">Priority</label>
            <select v-model="editableRecord.prioridad" required>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="participantes">Participants</label>
            <div v-for="(participant, index) in editableRecord.participantes" :key="index" class="participant">
              <input
                type="text"
                placeholder="Name"
                v-model="participant.nombre"
                required
              />
              <input
                type="text"
                placeholder="Rol"
                v-model="participant.rol"
                required
              />
              <button type="button" @click="removeParticipant(index)">⛔</button>
            </div>
            <button type="button" class="btn-add-participant" @click="addParticipant">Add Participant</button>
          </div>
  
          <div class="form-group">
            <label for="estado">Status</label>
            <select v-model="editableRecord.estado" required>
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="archivo">File</label>
            <input type="file" @change="handleFileUpload" />
            <p v-if="editableRecord.archivo">Current File: {{ editableRecord.archivo.name || 'No file uploaded' }}</p>
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
      show: {
        type: Boolean,
        required: true,
      },
      record: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editableRecord: { ...this.record },
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
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.editableRecord.archivo = file;
      },
      async updateRecord() {
        try {
          const formData = new FormData();
          formData.append("id", this.editableRecord.id);
          formData.append("caso", this.editableRecord.caso);
          formData.append("juez", this.editableRecord.juez);
          formData.append("fecha", this.editableRecord.fecha);
          formData.append("prioridad", this.editableRecord.prioridad);
          formData.append("estado", this.editableRecord.estado);
          formData.append("participantes", JSON.stringify(this.editableRecord.participantes));
  
          if (this.editableRecord.archivo) {
            formData.append("archivo", this.editableRecord.archivo);
          }
          
          console.log("Datos enviados al backend para actualización:");
                for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
                }

          await axios.put(`http://localhost:5000/api/record/${this.editableRecord.firebaseId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });
  
          this.$emit("save", this.editableRecord);
          this.closeModal();
        } catch (error) {
          console.error("Error al actualizar el expediente:", error.response?.data || error.message);
          alert("No se pudo actualizar el expediente. Intenta nuevamente.");
        }
      },
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
  }
  
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
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
  </style>
  