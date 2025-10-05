<template>
  <div class="register-page">
    <h1>Register</h1>
    <form class="register-form" @submit.prevent="handleRegister">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Choose a username"
          required
        />
      </div>

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

      <div class="form-group">
        <label for="retypePassword">Retype Password</label>
        <input
          type="password"
          id="retypePassword"
          v-model="retypePassword"
          placeholder="Retype your password"
          required
        />
      </div>

      <button type="submit" class="register-button">Register</button>
    </form>

    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const retypePassword = ref('');

function handleRegister() {
  if (password.value !== retypePassword.value) {
    alert('Passwords do not match!');
    return;
  }

  console.log({
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
    password: password.value
  });

  alert('Registration submitted (not yet connected to backend)');
}
</script>

<style scoped>
.register-page {
  margin: 0;
  padding-top: 0;
  min-height: calc(100vh - 83.2px);
  background-color: #e5e4e2;
  color: #1c1456;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 600px; /* wider form */
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem; /* space between first and last name */
  flex-wrap: wrap; /* wrap on smaller screens */
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1; /* each field takes equal width in row */
}

label {
  margin-bottom: 0.3rem;
  font-weight: 600;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
}

input:focus {
  outline: none;
  border-color: #1c1456;
  box-shadow: 0 0 0 2px rgba(28, 20, 86, 0.2);
}

.register-button {
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

.register-button:hover {
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

/* Responsive: stack first and last name on small screens */
@media (max-width: 500px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
