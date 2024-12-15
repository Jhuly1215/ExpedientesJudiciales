<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Enter your password" required />
      </div>

      <p class="register-link">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>

      <button type="submit" class="btn-continue">Continue</button>
    </form>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Download Our App</h2>
        <p>You can download our app using the link or QR code below:</p>
        <img src="../../../public/qr.jpeg" alt="QR Code" class="qr-code" />
        <br/>
        <a href="https://drive.google.com/drive/folders/1wof8lvaCnFzXkdKVWKQqGm2rafxD10xJ?usp=sharing" target="_blank" class="download-link">Download App</a>
        <button @click="closeModal" class="btn-close">Continue to Home</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showModal: false, // Estado para controlar la visibilidad del modal
    };
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const response = await axios.post("https://servermygestorrw-production.up.railway.app/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        const { token, userId } = response.data;

        // Almacenar el token y el userId en localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);

        alert("Login successful!");
        console.log("Token y User ID almacenados:", token, userId);

        // Mostrar la modal antes de redirigir a Home
        this.showModal = true;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert("Login failed: " + (error.response?.data.error || error.message));
      }
    },
    closeModal() {
      this.showModal = false;
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
/* Estilos del login */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: #346ac1; /* Azul de tu paleta */
  border-radius: 8px;
  text-align: center;
  color: white;
}

h1 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 14px;
}

.register-link {
  margin: 1rem 0;
  font-size: 14px;
  color: white;
}

.register-link a {
  color: #f47935; /* Naranja de tu paleta */
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

.btn-continue {
  background-color: #f47935; /* Naranja de tu paleta */
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.btn-continue:hover {
  background-color: #d46728; /* Un naranja más oscuro para el hover */
}

/* Estilos del modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #346ac1; /* Azul del login */
  color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.company-logo {
  max-width: 150px;
  margin-bottom: 1rem;
}

.qr-code {
  max-width: 200px;
  margin: 1rem auto;
}

.download-link {
  display: inline-block;
  margin: 1rem 0;
  color: #f47935; /* Naranja del login */
  text-decoration: none;
  font-weight: bold;
}

.download-link:hover {
  text-decoration: underline;
}

.btn-close {
  background-color: #f47935; /* Naranja del login */
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
}

.btn-close:hover {
  background-color: #d46728; /* Naranja oscuro para el hover */
}
</style>
