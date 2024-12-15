<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>Edit Movement</h2>
        <form @submit.prevent="updateMovement">
          <div class="form-group">
            <label for="fecha">Date</label>
            <input type="date" v-model="editedMovement.fecha" required />
          </div>
  
          <div class="form-group">
            <label for="movimiento">Movement</label>
            <input type="text" v-model="editedMovement.movimiento" placeholder="Enter movement ID" required />
          </div>
  
          <div class="form-group">
            <label for="sede">Location</label>
            <input type="text" v-model="editedMovement.sede" placeholder="Enter location" required />
          </div>
  
          <div class="form-group">
            <label for="tipo">Type</label>
            <select v-model="editedMovement.tipo" required>
              <option value="Archived">Archived</option>
              <option value="Reassignment">Reassignment</option>
              <option value="Delivery">Delivery</option>
              <option value="Status Update">Status Update</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="detalles">Details</label>
            <textarea v-model="editedMovement.detalles" placeholder="Enter details" required></textarea>
          </div>
  
          <div class="form-actions">
            <button type="submit" class="btn-primary">Update</button>
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
        movement: {
            type: Object,
            required: true,
        },
        recordId: {
            type: String,
            required: true,
        },
    },

    data() {
      return {
        editedMovement: { ...this.movement }, // Copiar los datos del movimiento seleccionado
      };
    },
    watch: {
      movement(newMovement) {
        // Actualizar los datos cuando cambie el movimiento seleccionado
        this.editedMovement = { ...newMovement };
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      async updateMovement() {
        try {
            console.log("Updating movement with Record ID:", this.recordId);
            console.log("Updating movement with Movement ID:", this.editedMovement.id);

            const response = await axios.put(
            `https://servermygestorrw-production.up.railway.app/api/movement/${this.recordId}/${this.editedMovement.id}`,
            this.editedMovement
            );

            console.log("Movement updated successfully:", response.data);
            this.$emit("update", this.editedMovement); // Envía el movimiento actualizado al padre
            this.closeModal();
        } catch (error) {
            console.error("Error updating movement:", error.response?.data || error.message);
            alert("Failed to update movement. Please try again.");
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
  .form-group select,
  .form-group textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
  
  textarea {
    resize: none;
    height: 100px;
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
  