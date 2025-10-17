<template>
  <div class="login-page">
    <!-- Animated food images (behind everything) -->
    <div class="food-anim" aria-hidden="true">
      <img src="/images/login_food1.jpg" alt="" class="food food-1" />
      <img src="/images/login_food2.jpg" alt="" class="food food-2" />
      <img src="/images/login_food3.jpg" alt="" class="food food-3" />
      <img src="/images/login_food4.jpg" alt="" class="food food-4" />
    </div>

    <div class="login-card-wrapper">
      <!-- Animated Border -->
      <div class="shine-border"></div>
      
      <!-- Card Content -->
      <div class="login-card">
        <!-- Left: image -->
        <div class="login-image" aria-hidden="true">
          <img src="/images/login_pic.jpg" alt="Login illustration" />
        </div>

        <!-- Right: form -->
        <div class="login-content">
        <h1>Login</h1>
        <p class="welcome-text">
          Welcome back! Time to turn your ingredients into delicious meals.
        </p>

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
    </div>
    </div>
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
    await axios.post(
      "http://localhost:4000/api/v1/users/login",
      {
        email: email.value,
        password: password.value,
      },
      { withCredentials: true }
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

.welcome-text {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: left;
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

@keyframes floatAround {
  0% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
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
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
}

@keyframes float {
  from {
    transform: translateY(0) rotate(0deg) scale(1);
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
    transform: translateY(0) rotate(0deg) scale(1);
  }
  to {
    transform: translateY(-12px) rotate(-3deg) scale(1.03);
  }
}

/* Card wrapper for border effect */
.login-card-wrapper {
  position: relative;
  width: 900px;
  max-width: 95%;
  border-radius: 1rem;
  padding: 3px;
  background: transparent;
  z-index: 1;
}

/* Animated Rainbow Border */
.shine-border {
  position: absolute;
  inset: -1px;
  border-radius: 1rem;

  background: linear-gradient(
    90deg,
    #a07cfe,
    #fe8fb5,
    #ffbe7b,
    #a07cfe
  );
  background-size: 400% 400%;
  animation: shineRotate 3s linear infinite;
  z-index: -1;
}

@keyframes shineRotate {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

/* Card with shine border */
.login-card {
  position: relative;
  display: flex;
  width: 100%;
  border-radius: calc(1rem - 3px);
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  align-items: stretch;
  z-index: 1;
}

.login-image {
  flex: 1;
  min-width: 320px;
  max-width: 460px;
  display: block;
  overflow: hidden;
  z-index: 2;
}
.login-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  filter: saturate(105%) contrast(98%);
}

.login-content {
  flex: 1;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
}

h1 {
  font-family: "Anton", sans-serif;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: left;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 420px;
  background-color: transparent;
  padding: 0;
  margin: 0;
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
.login-button {
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
.login-button:hover {
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

@media (max-width: 880px) {
  .login-card {
    flex-direction: column;
    width: 420px;
    max-width: 95%;
  }
  .login-image {
    display: none;
  }
  .food-anim {
    display: none;
  }
  .welcome-text {
    text-align: center;
  }
  h1,
  p {
    text-align: center;
  }
}
@media (max-width: 480px) {
  .login-content {
    padding: 1.25rem;
  }
  .login-form {
    max-width: 100%;
  }
}
</style>