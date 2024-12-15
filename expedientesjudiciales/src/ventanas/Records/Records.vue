<template>
    <div class="records-container">
      <!-- Barra de búsqueda -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="Buscar por fecha, juez asignado, categoría, estado"
          v-model="searchQuery"
        />
        <button @click="handleSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
  
      <!-- Tabla de registros -->
      <table class="records-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Case</th>
            <th>Judge</th>
            <th>Participants</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Movements</th>
            <th>Audiences</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.firebaseId">
            <!-- Mostrar el ID definido por el usuario -->
            <td>{{ record.id }}</td>
            <td>{{ record.caso }}</td>
            <td>{{ record.juez }}</td>
            <td>
                <ul>
                <!-- Depuración -->
                <li v-for="(participant, index) in record.participantes" :key="index">
                    {{ participant.nombre || "Sin nombre" }} ({{ participant.rol || "Sin rol" }})
                </li>
                </ul>
            </td>
            <td>{{ record.fecha }}</td>
            <td>
              <!-- Mostrar estado como Active o Inactive -->
              <span :class="record.estado ? 'active' : 'inactive'">
                {{ record.estado ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>{{ record.prioridad }}</td>
            <td>
                <button class="btn-action" @click="viewMovements(record.firebaseId)">View Movements</button>
            </td>
            <td>
                <button class="btn-action" @click="$router.push({ name: 'Audiences', params: { recordId: record.firebaseId } })">
                    View Audiences
                </button>
            </td>

            <td>
              <button class="btn-edit" @click="editRecord(record)">✎</button>
              <button class="btn-delete" @click="deleteRecord(record.firebaseId)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Botones de acciones -->
      <div class="actions">
        <button class="btn-primary" @click="openNewRecordModal">Cargar nuevo expediente</button>
        <button class="btn-secondary" @click="exportRecords">Exportar</button>
      </div>
  
      <!-- Componente NewRecord para el modal -->
      <NewRecord
        v-if="showNewRecordModal"
        :show="showNewRecordModal"
        @close="closeNewRecordModal"
        @save="saveRecord"
      />
      <EditRecord
        :show="showEditRecordModal"
        :record="selectedRecord"
        :userId="currentUserId" 
        @close="closeEditRecordModal"
        @save="updateRecordInList"
      />


    </div>
  </template>
  
  
  <script>
  import axios from "axios";
  import NewRecord from "./NewRecord.vue"; 
  import EditRecord from "./EditRecord.vue";

  export default {
    components: {
      NewRecord,
      EditRecord
    },
    data() {
      return {
        searchQuery: "",
        records: [], 
        showNewRecordModal: false,
        showEditRecordModal: false,
        currentUserId: null,
      };
    },
    computed: {
        filteredRecords() {
            if (!this.searchQuery) {
            return this.records;
            }
            const searchQueryLower = this.searchQuery.toLowerCase();

            return this.records.filter((record) => {
           
            const matchBasicFields = Object.values(record).some((value) =>
                String(value).toLowerCase().includes(searchQueryLower)
            );
            const matchParticipants = record.participantes?.some(
                (participant) =>
                participant.nombre.toLowerCase().includes(searchQueryLower) ||
                participant.rol.toLowerCase().includes(searchQueryLower)
            );

            return matchBasicFields || matchParticipants;
            });
        },
    },
    methods: {
        async fetchRecords() {
            try {
                
                const response = await axios.get("http://localhost:5000/api/record");
                this.records = response.data.map((doc) => ({
                ...doc,
                firebaseId: doc.firebaseId || doc.id,
                participantes: typeof doc.participantes === "string"
                ? JSON.parse(doc.participantes)
                : doc.participantes,
                estado: doc.estado === "true" || doc.estado === true,
                }));
            } catch (error) {
                console.error("Error al obtener los expedientes:", error.response?.data || error.message);
            }
        },
        async viewMovements(firebaseId) {
            this.$router.push({ name: "Movements", params: { recordId: firebaseId } });
        },


        handleSearch() {
            console.log("Buscando:", this.searchQuery);
        },
        openNewRecordModal() {
            this.showNewRecordModal = true;
        },
        closeNewRecordModal() {
            this.showNewRecordModal = false;
        },

        closeEditRecordModal() {
        this.showEditRecordModal = false;
        this.selectedRecord = null;
        },
        editRecord(record) {
            this.selectedRecord = { ...record }; 
            this.showEditRecordModal = true;
        },

        updateRecordInList(updatedRecord) {
    
            const index = this.records.findIndex((r) => r.firebaseId === updatedRecord.firebaseId);
            if (index !== -1) {
                this.records.splice(index, 1, updatedRecord);
            }
        },
        async saveRecord(newRecord) {
            try {
            
            const response = await axios.post("http://localhost:5000/api/record", newRecord);
            const savedRecord = response.data;
    
            
            this.records.push({
                ...newRecord,
                firebaseId: savedRecord.id,
            });
            this.closeNewRecordModal();
            } catch (error) {
            console.error("Error al guardar el expediente:", error.response?.data || error.message);
            alert("No se pudo guardar el expediente. Intenta nuevamente.");
            }
        },
        async deleteRecord(firebaseId) {
            try {
                await axios.delete(`http://localhost:5000/api/record/${firebaseId}`);
                this.records = this.records.filter((record) => record.firebaseId !== firebaseId);
                console.log(`Registro con ID ${firebaseId} eliminado exitosamente.`);
            } catch (error) {
                console.error("Error al eliminar el expediente:", error.response?.data || error.message);
                alert("No se pudo eliminar el expediente. Intenta nuevamente.");
            }
            },

        exportRecords() {
            console.log("Exportando registros...");
        },
    },
    mounted() {
      this.fetchRecords();
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        console.log("Token obtenido:", token);
        console.log("User ID obtenido:", userId);
        this.currentUserId = userId; // Asigna el userId aquí
      } else {
        console.error("No user is logged in. Redirecting to login.");
        this.$router.push("/login");
      }
    },


  };
  </script>
  <style scoped>
  .records-container {
    padding: 2rem;
  }
  
  .search-bar {
    display: flex;
    margin-bottom: 1rem;
  }
  
  .search-bar input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-bar button {
    background-color: #346ac1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-left: 0.5rem;
  }
  
  .records-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  
  .records-table th,
  .records-table td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }
  
  .records-table th {
    background-color: #346ac1;
    color: white;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
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
  .active {
  color: green;
  font-weight: bold;
}

.inactive {
  color: red;
  font-weight: bold;
}
.btn-action{
  background-color: #7F9CCA;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}
.btn-edit{
    color: #000000;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}
.btn-delete{
  color: #000000;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

  </style>
  