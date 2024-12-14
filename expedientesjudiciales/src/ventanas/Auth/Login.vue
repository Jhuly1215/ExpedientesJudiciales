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
    };
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        alert("Login successful!");
        console.log(response.data);
        this.$router.push("/"); // Ajusta la ruta según tu aplicación
      } catch (error) {
        alert("Login failed: " + (error.response?.data?.error || "Unexpected error"));
        console.error("Login error:", error);
      }
    },
  },
};
</script>
  
  <style scoped>
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
  </style>
  