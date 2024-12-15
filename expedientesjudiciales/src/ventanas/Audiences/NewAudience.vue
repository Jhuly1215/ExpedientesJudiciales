<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>New Audience</h2>
        <form @submit.prevent="saveAudience">
          <div class="form-group">
            <label for="fecha">Date</label>
            <input type="date" v-model="newAudience.fecha" required />
          </div>
  
          <div class="form-group">
            <label for="hora">Time</label>
            <input type="time" v-model="newAudience.hora" required />
          </div>
  
          <div class="form-group">
            <label for="juez">Judge</label>
            <input type="text" v-model="newAudience.juez" placeholder="Enter judge's name" required />
          </div>
  
          <div class="form-group">
            <label for="participantes">Participants</label>
            <div v-for="(participant, index) in newAudience.participantes" :key="index" class="participant">
              <input
                type="text"
                v-model="participant.nombre"
                placeholder="Name"
                required
              />
              <input
                type="text"
                v-model="participant.rol"
                placeholder="Role"
                required
              />
              <button type="button" @click="removeParticipant(index)">⛔</button>
            </div>
            <button type="button" class="btn-add-participant" @click="addParticipant">Add Participant</button>
          </div>
  
            <div class="form-group">
                <label for="estado">Status</label>
                <select v-model="newAudience.estado" required>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
  
            <div class="form-group">
                <label for="expedientes">Expedients</label>
                <div>
                    <!-- Input para buscar expedientes -->
                    <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search expedients by ID or case"
                    @input="searchExpedientes"
                    />
                    <!-- Sugerencias de búsqueda -->
                    <ul v-if="filteredExpedientes.length > 0" class="suggestions-list">
                    <li
                        v-for="expedient in filteredExpedientes"
                        :key="expedient.firebaseId"
                        @click="addExpedient(expedient.firebaseId)"
                    >
                        {{ expedient.caso }} ({{ expedient.firebaseId }})
                    </li>
                    </ul>
                </div>
                <!-- Lista de expedientes seleccionados -->
                <div v-for="(expedient, index) in newAudience.expedientes" :key="index" class="expedient">
                    <span>{{ expedient }}</span>
                    <button type="button" @click="removeExpedient(index)">⛔</button>
                </div>
            </div>

  
          <div class="form-group">
            <label for="descripcion">Description</label>
            <textarea
              v-model="newAudience.descripcion"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="acta">Act (URL)</label>
            <input type="url" v-model="newAudience.actaUrl" placeholder="Enter URL for act (optional)" />
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
    recordId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      expedientesExistentes: [], // Lista de expedientes existentes
      filteredExpedientes: [], // Lista filtrada por el motor de búsqueda
      searchQuery: "", // Query para el motor de búsqueda
      newAudience: {
        fecha: "",
        hora: "",
        juez: "",
        participantes: [],
        estado: "",
        expedientes: [],
        descripcion: "",
        actaUrl: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.newAudience = {
        fecha: "",
        hora: "",
        juez: "",
        participantes: [],
        estado: "",
        expedientes: [],
        descripcion: "",
        actaUrl: "",
      };
      this.searchQuery = "";
      this.filteredExpedientes = [];
    },
    addParticipant() {
      this.newAudience.participantes.push({ nombre: "", rol: "" });
    },
    removeParticipant(index) {
      this.newAudience.participantes.splice(index, 1);
    },
    addExpedient(expedientId) {
      // Añadir el ID del expediente seleccionado a la audiencia
      if (!this.newAudience.expedientes.includes(expedientId)) {
        this.newAudience.expedientes.push(expedientId);
      }
      this.searchQuery = ""; // Limpiar la búsqueda
      this.filteredExpedientes = []; // Limpiar las sugerencias
    },
    removeExpedient(index) {
      this.newAudience.expedientes.splice(index, 1);
    },
    searchExpedientes() {
      if (this.searchQuery.length > 0) {
        this.filteredExpedientes = this.expedientesExistentes.filter((expedient) =>
          expedient.caso.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          expedient.firebaseId.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredExpedientes = [];
      }
    },
    async fetchExpedientes() {
      try {
        const response = await axios.get("https://servermygestorrw-production.up.railway.app/api/record");
        this.expedientesExistentes = response.data.map((expedient) => ({
          firebaseId: expedient.id,
          caso: expedient.caso,
        }));
      } catch (error) {
        console.error("Error fetching expedientes:", error.response?.data || error.message);
      }
    },
    async saveAudience() {
      try {
        console.log("Sending to backend:");
        console.log("Record ID (recordId):", this.recordId);
        console.log("Audience data:", {
        fecha: this.newAudience.fecha,
        hora: this.newAudience.hora,
        juez: this.newAudience.juez,
        participantes: this.newAudience.participantes,
        estado: this.newAudience.estado,
        expedientes: this.newAudience.expedientes,
        descripcion: this.newAudience.descripcion,
        actaUrl: this.newAudience.actaUrl,
        });
        const response = await axios.post(
          `https://servermygestorrw-production.up.railway.app/api/audience/${this.recordId}`,
          {
            fecha: this.newAudience.fecha,
            hora: this.newAudience.hora,
            juez: this.newAudience.juez,
            participantes: JSON.stringify(this.newAudience.participantes),
            estado: this.newAudience.estado,
            expedientes: JSON.stringify(this.newAudience.expedientes),
            descripcion: this.newAudience.descripcion,
            actaUrl: this.newAudience.actaUrl,
          }
        );
        console.log("Audience saved successfully:", response.data);
        this.$emit("save");
        this.closeModal();
      } catch (error) {
        console.error("Error saving audience:", error.response?.data || error.message);
        alert("Failed to save audience. Please try again.");
      }
    },
  },
  mounted() {
    this.fetchExpedientes();
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
  
  textarea {
    resize: none;
    height: 100px;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
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
  
  .participant, .expedient {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn-add-participant, .btn-add-expedient {
    margin-top: 0.5rem;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .suggestions-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  position: absolute;
  z-index: 1000;
}

.suggestions-list li {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
  </style>
  