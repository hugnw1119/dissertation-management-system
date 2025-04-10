<template>
    <div class="title">
        <h1>Dissertation Management System</h1>
    </div>

    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      handleLogin() {
        // For now, we use basic validation
        if (this.email === "user@example.com" && this.password === "password123") {
          // In a real app, you would call an API here to authenticate
          alert("Login successful!");
          this.$router.push("/dashboard"); // Or redirect to the dashboard page
        } else {
          this.errorMessage = "Invalid email or password";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .title{
    margin-bottom: 50px;
    color: #1ca4b4;
    text-align: center;
  }
  .login-container {
    width: 400px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }

  
  input {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.4rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 0.8rem 1.6rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  