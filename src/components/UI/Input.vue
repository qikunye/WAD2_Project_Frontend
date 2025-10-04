<template>
  <!--
    A reusable input component that supports both single-line inputs and
    textareas.  It accepts v-model via the modelValue prop and emits an
    update:modelValue event when the user types.  The element uses custom
    CSS classes to match the project’s colour palette and typography.
  -->
  <div class="input-group">
    <label
      v-if="label"
      :for="id"
      class="input-label"
    >
      {{ label }}
    </label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      :rows="type === 'textarea' ? rows : undefined"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      class="input-field"
    />
  </div>
</template>

<script setup>
// Accept props for binding and configuration.
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  modelValue: { type: [String, Number], default: '' },
});

// Emit an update when the input changes so v-model works.
const emit = defineEmits(['update:modelValue']);

function updateValue(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style scoped>
/* Container for the input and its label */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

/* Label styling */
.input-label {
  font-family: var(--font-body);
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* Base styling for text inputs and textareas */
.input-field {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;
  font-family: var(--font-body);
  background-color: #fff;
  color: var(--color-primary);
  outline: none;
}

/* Focus state */
.input-field:focus {
  box-shadow: 0 0 0 2px var(--color-secondary);
}

/* Allow textarea resizing on the vertical axis only */
textarea.input-field {
  resize: vertical;
}
</style>
