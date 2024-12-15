<template>
    <aside class="sidebar">
      <ul>
        <li :class="{ active: $route.name === 'Home' }">
          <router-link to="/home" class="link">Home</router-link>
        </li>
        <li :class="{ active: $route.name === 'Records' }">
          <router-link to="/records" class="link">Records</router-link>
        </li>
        <li :class="{ active: $route.name === 'Users' }">
          <router-link to="/users" class="link">Users</router-link>
        </li>
        <li :class="{ active: $route.name === 'Audiences' }">
          <router-link to="/audiences" class="link">Audiences</router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    name: "SideBar",
    methods: {
      handleLogout() {
        // Eliminar el token del localStorage
        localStorage.removeItem("authToken");
  
        // Redirigir al login
        this.$router.push("/login");
  
        // Emitir evento al componente padre si es necesario
        this.$emit("logout");
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #545454;
    color: white;
    padding: 1rem;
    height: 100vh;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sidebar ul li {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    transition: background-color 0.3s ease;
  }
  .sidebar ul li:hover {
    background-color: #3d3b3b;
  }
  .sidebar ul li.active {
    background-color: #3d3b3b;
    font-weight: bold;
  }
  .link {
    color: inherit;
    text-decoration: none;
    display: block;
  }
  .link:hover {
    text-decoration: underline;
  }
  </style>
  