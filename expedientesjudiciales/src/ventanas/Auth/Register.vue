<template>
    <div class="register-container">
      <div class="form-container">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" placeholder="Enter your email" required />
          </div>
  
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="form.name" placeholder="Enter your name" required />
          </div>
  
          <div class="form-group">
            <label>ID</label>
            <input type="text" v-model="form.id" placeholder="Enter your ID" required />
          </div>
  
          <div class="form-group">
            <label>Password</label>
            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Enter your password"
                required
              />
              <span @click="togglePasswordVisibility" class="toggle-password">
                👁️‍🗨️
              </span>
            </div>
          </div>
  
          <div class="form-group">
            <label>Confirm Password</label>
            <div class="password-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                placeholder="Confirm your password"
                required
              />
              <span @click="toggleConfirmPasswordVisibility" class="toggle-password">
                👁️‍🗨️
              </span>
            </div>
          </div>
  
          <p class="login-link">
            Do you have an account? <a href="/login">Login</a>
          </p>
  
          <button type="submit" class="btn-continue">Continue</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        form: {
          email: "",
          name: "",
          id: "",
          password: "",
          confirmPassword: "",
        },
        showPassword: false,
        showConfirmPassword: false,
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      async handleRegister() {
        // Validar que las contraseñas coincidan
        if (this.form.password !== this.form.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        try {
          // Llamada al backend para registrar el usuario
          const response = await axios.post("http://localhost:5000/api/user", {
            email: this.form.email,
            name: this.form.name,
            id: this.form.id,
            password: this.form.password,
          });
          alert("User registered successfully!");
          this.$router.push("/login"); // Redirigir al login
        } catch (error) {
          alert("Error registering user: " + error.response.data.error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* General Container */
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
  }
  
  .form-container {
    background-color: #f47935;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
  }
  
  h1 {
    font-size: 24px;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  /* Form Styling */
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: white;
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
  
  /* Password Wrapper */
  .password-wrapper {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: gray;
  }
  
  /* Login Link */
  .login-link {
    margin: 1rem 0;
    font-size: 14px;
    color: white;
  }
  
  .login-link a {
    color: #346ac1;
    text-decoration: none;
    font-weight: bold;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  /* Button */
  .btn-continue {
    background-color: #346ac1;
    color: white;
    padding: 0.7rem 1.5rem;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-continue:hover {
    background-color: #275b99;
  }
  </style>
  