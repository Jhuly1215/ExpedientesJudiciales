<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
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

header {
  background-color: #f47935; /* Naranja de tu paleta */
  padding: 1rem;
}

header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

header nav ul li {
  display: inline;
}

header nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

header nav ul li a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}
</style>
