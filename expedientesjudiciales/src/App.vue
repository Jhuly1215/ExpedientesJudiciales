<template>
  <div id="app">
    <!-- Header siempre visible -->
    <header>
      <nav>
        <ul v-if="isAuthenticated">
          <!-- Mostrar botón de cerrar sesión si está autenticado -->
          <li>
            <button class="btn-logout" @click="handleLogout">Cerrar Sesión</button>
          </li>
        </ul>
        <ul v-else>
          <!-- Mostrar opciones de registro e inicio de sesión si no está autenticado -->
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
        </ul>
      </nav>
    </header>

    <div class="layout">
      <!-- Sidebar si el usuario está autenticado -->
      <div v-if="isAuthenticated" class="sidebar-container">
        <SideBar />
      </div>

      <!-- Contenido principal -->
      <main class="main-content">
        <router-view @updateTitle="updatePageTitle" />
      </main>
    </div>
    <ChatBot />
  </div>
</template>

<script>
import SideBar from "./components/base/SideBar.vue";
import ChatBot from "./components/ChatBot.vue";
export default {
  name: "App",
  components: {
    SideBar,
    ChatBot,
  },
  data() {
    return {
      isAuthenticated: false, // Estado de autenticación
    };
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("authToken");
      this.isAuthenticated = !!token; // Convertir a booleano
    },
    handleLogout() {
      localStorage.removeItem("authToken"); // Eliminar token
      this.isAuthenticated = false; // Cambiar estado
      this.$router.push("/login"); // Redirigir al login
    },
  },
  created() {
    this.checkAuth(); // Verificar autenticación al cargar la app
  },
};
</script>

<style>
body,
#app {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Ocultar scroll horizontal */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* Header */
header {
  background-color: #f47935; /* Naranja de tu paleta */
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end; /* Alineación a la derecha */
  gap: 1rem;
}

header nav ul li {
  display: inline;
}

header nav ul li a,
header nav ul li button {
  text-decoration: none;
  color: white;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
}

header nav ul li a:hover,
header nav ul li button:hover {
  text-decoration: underline;
}

/* Layout principal */
.layout {
  display: flex;
  margin-top: 60px; /* Altura del header */
  height: calc(100vh - 60px); /* Altura restante después del header */
}

/* Sidebar */
.sidebar-container {
  width: 250px;
  background-color: #545454;
  height: 100%; /* Usar toda la altura disponible */
  overflow-y: auto;
}

/* Contenido principal */
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9; /* Fondo claro */
  overflow-y: auto;
}
</style>
