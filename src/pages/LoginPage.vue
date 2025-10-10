<template>
  <div class="login-page">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="handleLogin">
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

      <button type="submit" class="login-button">Login</button>
    </form>
    <p>
      Don't have an account?
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("");
const password = ref("");

async function handleLogin() {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );

    router.push("/profile");
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Login failed. Please try again.");
  }
}
</script>

<style scoped>
.login-page {
  padding: 1rem;
  min-height: calc(100vh - 83.2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-family: "Anton", sans-serif;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
}

input:focus {
  outline: none;
  border-color: #1c1456;
  box-shadow: 0 0 0 2px rgba(28, 20, 86, 0.2);
}

.login-button {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: #1c1456;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: #3a2d80;
  transform: translateY(-2px);
}

p {
  margin-top: 1.5rem;
  font-size: 0.95rem;
}

p a {
  color: #1c1456;
  text-decoration: underline;
  font-weight: 600;
}
</style>
