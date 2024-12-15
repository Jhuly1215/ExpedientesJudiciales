<template>
  <nav class="navbar">
    <!-- Icono para abrir/cerrar el sidebar -->
    <div class="menu-icon" @click="$emit('toggleSidebar')">☰</div>

    <!-- Título dinámico del navbar -->
    <h1 class="navbar-title">{{ title }}</h1>

    <!-- Acciones del usuario -->
    <div class="navbar-actions">
      <!-- Botón de cerrar sesión si el usuario está autenticado -->
      <button v-if="isAuthenticated" class="btn-logout" @click="handleLogout">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Expedientes", // Título por defecto
    },
    isAuthenticated: {
      type: Boolean,
      default: false, // Estado de autenticación
    },
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      alert("Logged out successfully!");
      
      // Redirigir al login
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #545454;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-icon {
  font-size: 24px;
  cursor: pointer;
  user-select: none;
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.btn-logout {
  background-color: #f47935;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background-color: #d46728;
}
</style>
