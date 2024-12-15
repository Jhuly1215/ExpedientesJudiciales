<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>New Record</h2>
        <form @submit.prevent="saveRecord">
          <div class="form-group">
            <label for="id">ID Record</label>
            <input type="text" v-model="newRecord.id" required />
          </div>
  
          <div class="form-group">
            <label for="caso">Case</label>
            <input type="text" v-model="newRecord.caso" required />
          </div>
  
          <div class="form-group">
            <label for="juez">Judge</label>
            <input type="text" v-model="newRecord.juez" required />
          </div>
  
          <div class="form-group">
            <label for="fecha">Date</label>
            <input type="date" v-model="newRecord.fecha" required />
          </div>
  
          <div class="form-group">
            <label for="prioridad">Priority</label>
            <select v-model="newRecord.prioridad" required>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="participantes">Participants</label>
            <div v-for="(participant, index) in newRecord.participantes" :key="index" class="participant">
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
            <select v-model="newRecord.estado" required>
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
            </select>
          </div>

          <div class="form-group">
            <label for="archivo">File</label>
            <input type="file" @change="handleFileUpload" />
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
    },
    data() {
      return {
        newRecord: {
          id: "",
          caso: "",
          juez: "",
          fecha: "",
          prioridad: "",
          participantes: [],
          estado: true,
          archivo: null,
        },
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
        this.resetNewRecord();
      },
      resetNewRecord() {
        this.newRecord = {
          id: "",
          caso: "",
          juez: "",
          fecha: "",
          prioridad: "",
          participantes: [],
          archivo: null,
        };
      },
      addParticipant() {
        this.newRecord.participantes.push({ nombre: "", rol: "" });
      },
      removeParticipant(index) {
        this.newRecord.participantes.splice(index, 1);
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.newRecord.archivo = file;
      },
      async saveRecord() {
        try {
            const formData = new FormData();
            formData.append("id", this.newRecord.id);
            formData.append("caso", this.newRecord.caso);
            formData.append("juez", this.newRecord.juez);
            formData.append("fecha", this.newRecord.fecha);
            formData.append("prioridad", this.newRecord.prioridad);
            formData.append("estado", this.newRecord.estado); // Incluir el estado
            formData.append("participantes", JSON.stringify(this.newRecord.participantes)); // Convertir a JSON
            if (this.newRecord.archivo) {
            formData.append("archivo", this.newRecord.archivo); // Adjuntar archivo solo si existe
            }

            const response = await axios.post("https://servermygestorrw-production.up.railway.app/api/record", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Expediente guardado:", response.data);
            this.$emit("save", response.data);
            this.closeModal();
        } catch (error) {
            console.error("Error al guardar el expediente:", error.response?.data || error.message);
            alert("No se pudo guardar el expediente. Intenta nuevamente.");
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
  