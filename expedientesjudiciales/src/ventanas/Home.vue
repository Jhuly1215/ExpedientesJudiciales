<template>
    <div class="home-container">
      <!-- Contadores -->
      <div class="counters">
        <div class="counter-card active">
          <p>Expedientes activos</p>
          <h2>{{ activeRecords }}</h2>
        </div>
        <div class="counter-card in-review">
          <p>Expedientes en revisión</p>
          <h2>{{ inReviewRecords }}</h2>
        </div>
        <div class="counter-card concluded">
          <p>Expedientes concluidos</p>
          <h2>{{ concludedRecords }}</h2>
        </div>
      </div>
  
      <!-- Dashboard placeholder -->
      <div class="dashboard">
        <h1>DASHBOARD, HAY QUE PENSAR TODAVÍA</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home",
    data() {
      return {
        // Aquí se pueden conectar datos reales desde el backend
        activeRecords: 30,
        inReviewRecords: 20,
        concludedRecords: 30,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Contenedor principal */
  .home-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  /* Contadores */
  .counters {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  /* Estilos de las tarjetas de los contadores */
  .counter-card {
    width: 200px;
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    text-align: center;
  }
  
  /* Colores según el estado */
  .counter-card.active {
    background-color: #f47935; /* Naranja */
  }
  
  .counter-card.in-review {
    background-color: #346ac1; /* Azul */
  }
  
  .counter-card.concluded {
    background-color: #7f9cca; /* Azul claro */
  }
  
  /* Texto dentro de las tarjetas */
  .counter-card p {
    margin: 0;
    font-size: 16px;
  }
  
  .counter-card h2 {
    font-size: 32px;
    margin: 0;
  }
  
  /* Dashboard */
  .dashboard {
    width: 100%;
    height: 300px;
    background-color: #e0e0e0; /* Placeholder gris */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 24px;
    color: #555;
  }
  </style>
  