<template>
    <div>
      <!-- Botón flotante -->
      <button class="chat-button" @click="toggleChatModal">💬 Chat</button>
  
      <!-- Modal del Chat -->
      <div v-if="showChat" class="chat-modal">
        <div class="chat-header">
          <h3>AI Chatbot</h3>
          <button @click="toggleChatModal" class="close-button">✖</button>
        </div>
        <div class="chat-body">
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
            {{ msg.text }}
          </div>
        </div>
        <div class="chat-footer">
          <input
            type="text"
            v-model="userMessage"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        showChat: false, // Estado para mostrar/ocultar el chat
        userMessage: "", // Mensaje actual del usuario
        messages: [], // Lista de mensajes del chat
      };
    },
    methods: {
      toggleChatModal() {
        this.showChat = !this.showChat;
      },
      async sendMessage() {
        if (this.userMessage.trim() === "") return;

        // Agrega el mensaje del usuario a la lista
        this.messages.push({ text: this.userMessage, sender: "user" });

        try {
            const response = await axios.post("http://localhost:5000/api/chat", {
            message: this.userMessage,
            });

            this.messages.push({ text: response.data.reply, sender: "bot" });
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            this.messages.push({
            text: "Sorry, I couldn't process your request.",
            sender: "bot",
            });
        }

        this.userMessage = ""; // Limpiar el input
        }

    },
  };
  </script>
  
  <style scoped>
  /* Botón flotante */
  .chat-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #346ac1;
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  /* Modal de Chat */
  .chat-modal {
    position: fixed;
    bottom: 4rem;
    right: 2rem;
    width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    background-color: #346ac1;
    color: white;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px 8px 0 0;
  }
  
  .chat-body {
    padding: 1rem;
    height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .message {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 8px;
  }
  
  .user {
    align-self: flex-end;
    background-color: #f47935;
    color: white;
  }
  
  .bot {
    align-self: flex-start;
    background-color: #ddd;
    color: black;
  }
  
  .chat-footer {
    display: flex;
    padding: 0.5rem;
    border-top: 1px solid #ccc;
  }
  
  .chat-footer input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 0.5rem;
  }
  
  .chat-footer button {
    background-color: #f47935;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .close-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>
  