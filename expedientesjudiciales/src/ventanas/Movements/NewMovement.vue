<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>New Movement</h2>
        <form @submit.prevent="saveMovement">
          <div class="form-group">
            <label for="fecha">Date</label>
            <input type="date" v-model="newMovement.fecha" required />
          </div>
  
          <div class="form-group">
            <label for="movimiento">Movement</label>
            <input type="text" v-model="newMovement.movimiento" placeholder="Enter movement ID" required />
          </div>
  
          <div class="form-group">
            <label for="sede">Location</label>
            <input type="text" v-model="newMovement.sede" placeholder="Enter location" required />
          </div>
  
          <div class="form-group">
            <label for="tipo">Type</label>
            <select v-model="newMovement.tipo" required>
              <option value="Archived">Archived</option>
              <option value="Reassignment">Reassignment</option>
              <option value="Delivery">Delivery</option>
              <option value="Status Update">Status Update</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="detalles">Details</label>
            <textarea v-model="newMovement.detalles" placeholder="Enter details" required></textarea>
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
        newMovement: {
          fecha: "",
          movimiento: "",
          sede: "",
          tipo: "",
          detalles: "",
        },
      };
    },
    methods: {
        closeModal() {
            this.$emit("close");
            this.resetForm();
        },
        resetForm() {
            this.newMovement = {
            fecha: "",
            movimiento: "",
            sede: "",
            tipo: "",
            detalles: "",
            };
        },
        async saveMovement() {
            try {


                console.log("Record ID being sent:", this.recordId);
                console.log("Movement data being sent:", this.newMovement);


                // Validar que todos los campos están completos
                if (
                !this.newMovement.fecha ||
                !this.newMovement.movimiento ||
                !this.newMovement.sede ||
                !this.newMovement.tipo ||
                !this.newMovement.detalles
                ) {
                alert("All fields are required.");
                return;
                }

                // Enviar la solicitud al backend
                const response = await axios.post(
                `http://localhost:5000/api/movement/${this.recordId}`,
                this.newMovement
                );
                console.log("Movement saved successfully:", response.data);

                // Emitir evento para notificar que se guardó el movimiento
                this.$emit("save");
                this.closeModal();
            } catch (error) {
                console.error("Error saving movement:", error.response?.data || error.message);
                alert("Failed to save movement. Please try again.");
            }
        }

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
  