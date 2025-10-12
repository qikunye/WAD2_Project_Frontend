<template>
  <div class="register-page">
    <!-- Floating food background -->
    <div class="food-anim" aria-hidden="true">
      <img src="/images/login_food1.jpg" alt="" class="food food-1" />
      <img src="/images/login_food2.jpg" alt="" class="food food-2" />
      <img src="/images/login_food3.jpg" alt="" class="food food-3" />
      <img src="/images/login_food4.jpg" alt="" class="food food-4" />
    </div>

    <div class="register-card">
      <!-- Left side: image -->
      <div class="register-image" aria-hidden="true">
        <img src="/images/register_pic.jpg" alt="Register illustration" />
      </div>

      <!-- Right side: form -->
      <div class="register-content">
        <h1>Register</h1>
        <p class="welcome-text">
          Join us and start creating meals that save food waste!
        </p>

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

          <div class="form-row">
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
          </div>

          <button type="submit" class="register-button">Register</button>
        </form>

        <p>
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const retypePassword = ref("");

function handleRegister() {
  if (password.value !== retypePassword.value) {
    alert("Passwords do not match!");
    return;
  }

  console.log({
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
    password: password.value,
  });

  alert("Registration submitted (not yet connected to backend)");
}
</script>

<style scoped>
.register-page {
  position: relative;
  padding: 1rem;
  min-height: calc(100vh - 93.2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #f5f7fb;
  overflow: hidden;
}

.food-anim {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.food-anim .food {
  position: absolute;
  will-change: transform, opacity;
  opacity: 0.12;
  transform-origin: center;
  user-select: none;
}

.food-1 {
  left: 2%;
  top: 20%;
  width: 220px;
  animation: floatSlow 12s ease-in-out infinite alternate;
}
.food-2 {
  right: 2%;
  top: 60%;
  width: 300px;
  animation: float 9s ease-in-out infinite alternate-reverse;
}
.food-3 {
  left: 75%;
  top: 15%;
  width: 310px;
  transform: translateX(-50%);
  animation: floatFast 7s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}
.food-4 {
  left: 2%;
  top: 60%;
  width: 300px;
  opacity: 0.13;
  animation: floatAround 14s ease-in-out infinite alternate;
}

/* Floating animations */
@keyframes floatAround {
  0% {
    transform: translate(0, 0) rotate(0) scale(1);
  }
  25% {
    transform: translate(20px, -15px) rotate(3deg) scale(1.02);
  }
  50% {
    transform: translate(-15px, 20px) rotate(-2deg) scale(1.01);
  }
  75% {
    transform: translate(10px, -10px) rotate(1deg) scale(1.02);
  }
  100% {
    transform: translate(0, 0) rotate(0) scale(1);
  }
}
@keyframes float {
  from {
    transform: translateY(0) rotate(0) scale(1);
  }
  to {
    transform: translateY(-18px) rotate(6deg) scale(1.02);
  }
}
@keyframes floatSlow {
  from {
    transform: translateY(0) rotate(-2deg) scale(1);
  }
  to {
    transform: translateY(-28px) rotate(4deg) scale(1.04);
  }
}
@keyframes floatFast {
  from {
    transform: translateY(0) rotate(0) scale(1);
  }
  to {
    transform: translateY(-12px) rotate(-3deg) scale(1.03);
  }
}

/* Card */
.register-card {
  position: relative;
  display: flex;
  width: 900px;
  max-width: 95%;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  align-items: stretch;
  z-index: 1;
}

/* Left: image */
.register-image {
  flex: 1;
  min-width: 320px;
  max-width: 460px;
  display: block;
  overflow: hidden;
  z-index: 1;
}
.register-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  filter: saturate(105%) contrast(98%);
}

/* Right: form content */
.register-content {
  flex: 1;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
}

/* Form */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 420px;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.form-row .form-group {
  flex: 1;
  min-width: 200px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 0.3rem;
  font-weight: 600;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  background: rgba(255, 255, 255, 0.6);
}

input:focus {
  outline: none;
  border-color: #1c1456;
  box-shadow: 0 0 0 4px rgba(28, 20, 86, 0.06);
}

/* Text */
h1 {
  font-family: "Anton", sans-serif;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: left;
}

.welcome-text {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: left;
}

/* Button */
.register-button {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: #1c1456;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.15s ease;
}

.register-button:hover {
  background-color: #3a2d80;
  transform: translateY(-2px);
}

p {
  margin-top: 1.25rem;
  font-size: 0.95rem;
  text-align: left;
}

p a {
  color: #1c1456;
  text-decoration: underline;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 880px) {
  .register-card {
    flex-direction: column;
    width: 420px;
    max-width: 95%;
  }
  .register-image {
    display: none;
  }
  .food-anim {
    display: none;
  }
  .welcome-text,
  h1,
  p {
    text-align: center;
  }
}
@media (max-width: 480px) {
  .register-content {
    padding: 1.25rem;
  }
  .register-form {
    max-width: 100%;
  }
}
</style>
