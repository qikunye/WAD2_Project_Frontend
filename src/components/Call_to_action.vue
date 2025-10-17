<template>
  <section id="call_to_action" class="call-to-action-section" ref="sectionRef">
    <div class="impact-container">
      <h1 class="impact-title">
        <span class="title-line">TRANSFORM</span>
        <span class="title-line">YOUR IMPACT</span>
      </h1>
      
      <p class="impact-subtitle">
        See the journey from waste to sustainability
      </p>

      <!-- Image Slider Container -->
      <div 
        class="slider-wrapper"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
      >
        <!-- Before Image (Background Layer) -->
        <div class="image-layer before-layer">
          <img 
            src="/images/call_to_action_before.png" 
            alt="Before - Food Waste" 
            class="impact-image"
          />
          <div class="image-label before-label">
            <span class="label-icon">🗑️</span>
            <span>BEFORE</span>
          </div>
        </div>

        <!-- Gradient Divider with Motion Blur -->
        <div 
          class="divider"
          :style="{ left: `${sliderPosition}%` }"
        >
          <div class="divider-gradient"></div>
          <div class="divider-handle">
            <span class="handle-icon">↔</span>
          </div>
        </div>

        <!-- After Image (Foreground Layer with Clip Path) -->
        <div 
          class="image-layer after-layer"
          :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
        >
          <img 
            src="/images/call_to_action_after.png" 
            alt="After - Sustainability" 
            class="impact-image"
          />
          <div class="image-label after-label">
            <span class="label-icon">🌱</span>
            <span>AFTER</span>
          </div>
        </div>

        <!-- Interactive Overlay -->
        <div 
          class="slider-overlay"
          @mousemove="handleSlide"
          @touchmove="handleTouchSlide"
        ></div>

        <!-- Canvas Confetti -->
        <canvas 
          ref="confettiCanvas"
          class="confetti-canvas"
          :class="{ 'active': showConfetti }"
        ></canvas>
      </div>

      <!-- Challenge Section -->
      <div class="challenge-section">
        <h2 class="challenge-title">The Challenge We Face Today</h2>
        <p class="challenge-text">
          Food waste is a growing problem, but together we can change that.
        </p>
        <button class="cta-button" @click="scrollToStart">
          START YOUR JOURNEY
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const confettiCanvas = ref(null)
const sliderPosition = ref(50)
const isHovering = ref(false)
const showConfetti = ref(false)
let confettiContext = null

// Confetti particle class
class ConfettiParticle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = -20 - Math.random() * 100 // Start above canvas
    this.velocity = {
      x: (Math.random() - 0.5) * 6,
      y: Math.random() * 3 + 2
    }
    this.rotation = Math.random() * 360
    this.rotationSpeed = (Math.random() - 0.5) * 10
    this.size = Math.random() * 8 + 4
    this.colors = ['#4ade80', '#22c55e', '#16a34a', '#86efac', '#dcfce7']
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
    this.opacity = 1
    this.gravity = 0.3
  }

  update() {
    this.velocity.y += this.gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.rotation += this.rotationSpeed

    // Fade out near bottom
    if (this.y > this.canvas.height * 0.8) {
      this.opacity -= 0.02
    }

    // Reset if off screen
    if (this.y > this.canvas.height + 20 || this.opacity <= 0) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.translate(this.x, this.y)
    ctx.rotate((this.rotation * Math.PI) / 180)
    
    // Draw confetti piece (rectangle)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6)
    
    ctx.restore()
  }
}

const initConfetti = () => {
  if (!confettiCanvas.value) return
  
  const canvas = confettiCanvas.value
  const ctx = canvas.getContext('2d')
  confettiContext = ctx
  
  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

let confettiParticles = []
let confettiAnimationFrame = null

const startConfetti = () => {
  if (!confettiCanvas.value || !confettiContext) return
  
  // Create confetti particles if not already created
  if (confettiParticles.length === 0) {
    for (let i = 0; i < 100; i++) {
      confettiParticles.push(new ConfettiParticle(confettiCanvas.value))
    }
  }
  
  // Start animation loop
  if (!confettiAnimationFrame) {
    animateConfetti()
  }
}

const stopConfetti = () => {
  // Stop animation
  if (confettiAnimationFrame) {
    cancelAnimationFrame(confettiAnimationFrame)
    confettiAnimationFrame = null
  }
  
  // Clear particles
  confettiParticles = []
  
  // Clear canvas
  if (confettiContext && confettiCanvas.value) {
    confettiContext.clearRect(0, 0, confettiCanvas.value.width, confettiCanvas.value.height)
  }
}

const animateConfetti = () => {
  if (!confettiContext || !confettiCanvas.value || !showConfetti.value) {
    stopConfetti()
    return
  }
  
  confettiContext.clearRect(0, 0, confettiCanvas.value.width, confettiCanvas.value.height)
  
  confettiParticles.forEach(particle => {
    particle.update()
    particle.draw(confettiContext)
  })
  
  confettiAnimationFrame = requestAnimationFrame(animateConfetti)
}

// Watch slider position to control confetti
watch(sliderPosition, (newPosition) => {
  if (newPosition > 75) {
    showConfetti.value = true
    startConfetti()
  } else {
    showConfetti.value = false
    stopConfetti()
  }
})

const handleSlide = (event) => {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = (x / rect.width) * 100
  sliderPosition.value = Math.max(0, Math.min(100, percentage))
}

const handleTouchSlide = (event) => {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const touch = event.touches[0]
  const x = touch.clientX - rect.left
  const percentage = (x / rect.width) * 100
  sliderPosition.value = Math.max(0, Math.min(100, percentage))
}

const handleHover = () => {
  isHovering.value = true
}

const handleLeave = () => {
  isHovering.value = false
}

const scrollToStart = () => {
  // Scroll to login section or register
  const targetElement = document.querySelector('#login') || document.querySelector('#register')
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Auto-animate on mount for first impression
onMounted(() => {
  initConfetti()
  
  setTimeout(() => {
    let progress = 50
    const interval = setInterval(() => {
      progress += 1
      sliderPosition.value = progress
      
      if (progress >= 85) {
        clearInterval(interval)
        
        // Reset after demo
        setTimeout(() => {
          sliderPosition.value = 50
        }, 3000)
      }
    }, 20)
  }, 1000)
})

onUnmounted(() => {
  stopConfetti()
})
</script>

<style scoped>
.call-to-action-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 4rem 2rem;
  overflow: hidden;
}

.impact-container {
  max-width: 1400px;
  margin: 0 auto;
}

.impact-title {
  text-align: center;
  margin-bottom: 1rem;
  line-height: 0.9;
}

.title-line {
  display: block;
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 900;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.impact-subtitle {
  text-align: center;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  font-family: var(--font-body, 'Poppins', sans-serif);
}

.slider-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: ew-resize;
}

.image-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.impact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.before-layer {
  z-index: 1;
}

.after-layer {
  z-index: 2;
  transition: clip-path 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-label {
  position: absolute;
  top: 2rem;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  font-family: var(--font-heading, 'Anton', sans-serif);
}

.before-label {
  right: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.after-label {
  left: 2rem;
  background: rgba(34, 197, 94, 0.95);
  border: 1px solid rgba(34, 197, 94, 1);
  color: #ffffff;
}

.label-icon {
  font-size: 1.25rem;
}

/* Gradient Divider with Motion Blur */
.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  z-index: 5;
  transform: translateX(-50%);
  pointer-events: none;
  transition: left 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.divider-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%
  );
  filter: blur(2px);
  animation: pulse 2s ease-in-out infinite;
}

.divider-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.handle-icon {
  font-size: 24px;
  color: #1e293b;
  font-weight: bold;
}

.slider-overlay {
  position: absolute;
  inset: 0;
  z-index: 4;
  cursor: ew-resize;
}

.confetti-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.confetti-canvas.active {
  opacity: 1;
}

/* Challenge Section */
.challenge-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.challenge-title {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.challenge-text {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: var(--font-body, 'Poppins', sans-serif);
}

.cta-button {
  background: linear-gradient(135deg, #1c1456 0%, #f4b6c2 100%);
  color: white;
  padding: 1rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(28, 20, 86, 0.3);
  font-family: var(--font-body, 'Poppins', sans-serif);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(244, 182, 194, 0.4);
  background: linear-gradient(135deg, #f4b6c2 0%, #1c1456 100%);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .call-to-action-section {
    padding: 2rem 1rem;
  }

  .slider-wrapper {
    aspect-ratio: 4 / 3;
    border-radius: 16px;
  }

  .image-label {
    top: 1rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.75rem;
  }

  .before-label {
    right: 1rem;
  }

  .after-label {
    left: 1rem;
  }

  .divider-handle {
    width: 40px;
    height: 40px;
  }

  .handle-icon {
    font-size: 20px;
  }
}
</style>