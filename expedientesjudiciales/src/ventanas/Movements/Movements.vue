<template>
    <div class="movements-container">
      <h2>Movements for Record: {{  recordDocumentId }}</h2>
  
      <!-- Botón para agregar nuevo movimiento -->
      <div class="actions">
        <button class="btn-primary" @click="openNewMovementModal">New Movement</button>
      </div>
  
      <!-- Tabla de movimientos -->
      <table v-if="movements.length > 0" class="movements-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Movement</th>
            <th>Location</th>
            <th>Type</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in movements" :key="movement.id">
            <td>{{ movement.fecha }}</td>
            <td>{{ movement.movimiento }}</td>
            <td>{{ movement.sede }}</td>
            <td>{{ movement.tipo }}</td>
            <td>{{ movement.detalles }}</td>
            <td>
              <button class="btn-edit" @click="openEditMovementModal(movement)">✏️</button>
              <button class="btn-delete" @click="deleteMovement(movement.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Mensaje cuando no hay movimientos -->
      <div v-else class="no-movements">
        <p>No movements registered for this record.</p>
      </div>
  
      <!-- Componente para registrar un nuevo movimiento -->
      <NewMovement
        v-if="showNewMovementModal"
        :show="showNewMovementModal"
        :recordId="recordId"
        @close="closeNewMovementModal"
        @save="fetchMovements"
      />
      <EditMovement
        v-if="showEditMovementModal"
        :show="showEditMovementModal"
        :recordId="recordId"
        :movement="selectedMovement"
        @close="closeEditMovementModal"
        @update="fetchMovements"
      />
    </div>
</template>
  
  
<script>
  import axios from "axios";
  import NewMovement from "./NewMovement.vue";
  import EditMovement from "./EditMovement.vue";
  export default {
    components:{
        NewMovement,
        EditMovement,
    },
    data() {
      return {
        recordId: this.$route.params.recordId, // Obtenemos el ID del record desde los parámetros
        movements: [], // Lista de movimientos
        showNewMovementModal: false,
        showEditMovementModal: false,
        recordDocumentId: "", // ID del documento del record
      };
    },
    methods: {
        async fetchRecord() {
            try {
                // Llamada a la API para obtener el record desde Firebase
                const response = await axios.get(
                `https://servermygestorrw-production.up.railway.app/api/record/${this.recordId}`
                );

                // Almacena el ID del documento del record
                this.recordDocumentId = response.data.id || this.recordId;

                console.log("Record document ID:", this.recordDocumentId); // Debug: muestra el ID
            } catch (error) {
                console.error("Error al obtener el record:", error.response?.data || error.message);
                this.recordDocumentId = "Error loading record ID";
            }
        },
      async fetchMovements() {
        try {
          const response = await axios.get(
            `https://servermygestorrw-production.up.railway.app/api/movement/${this.recordId}`
          );
          this.movements = response.data;
        } catch (error) {
          console.error("Error al obtener los movimientos:", error.response?.data || error.message);
        }
      },
      openNewMovementModal() {
        this.showNewMovementModal = true;
      },
      closeNewMovementModal() {
        this.showNewMovementModal = false;
      },
      async deleteMovement(movementId) {
        try {
          await axios.delete(`https://servermygestorrw-production.up.railway.app/api/movement/${this.recordId}/${movementId}`);
          this.movements = this.movements.filter((m) => m.id !== movementId);
          alert("Movement deleted successfully.");
        } catch (error) {
          console.error("Error al eliminar el movimiento:", error.response?.data || error.message);
          alert("Failed to delete movement. Please try again.");
        }
      },

      openEditMovementModal(movement) {
        this.selectedMovement = { ...movement }; // Clonar el movimiento seleccionado
        this.showEditMovementModal = true;
      },
      closeEditMovementModal() {
        this.showEditMovementModal = false;
        this.selectedMovement = null; // Limpiar el movimiento seleccionado
      },
      async updateMovement(updatedMovement) {
        try {
          const response = await axios.put(
            `https://servermygestorrw-production.up.railway.app/api/movement/${updatedMovement.id}`,
            updatedMovement
          );
          console.log("Movement updated successfully:", response.data);

          // Actualizar la lista de movimientos
          const index = this.movements.findIndex((m) => m.id === updatedMovement.id);
          if (index !== -1) {
            this.movements.splice(index, 1, updatedMovement);
          }

          this.closeEditMovementModal();
        } catch (error) {
          console.error("Error updating movement:", error.response?.data || error.message);
          alert("Failed to update movement. Please try again.");
        }
      },


    },

    mounted() {
      this.fetchMovements();
      this.fetchRecord();
    },
  };
</script>
  
<style scoped>
.movements-container {
  padding: 2rem;
}

.actions {
  display: flex;
  justify-content: flex-end; /* Alinear el botón a la derecha */
  margin-bottom: 1rem;
}

.movements-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.movements-table th,
.movements-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.movements-table th {
  background-color: #346ac1;
  color: white;
}

.no-movements {
  text-align: center;
}

.btn-primary {
  background-color: #f47935;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}</style>
