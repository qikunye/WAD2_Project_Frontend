<template>
  <!--
    A reusable input component that supports both standard inputs and textareas
    and exposes a v-model compatible API. The component accepts an `id`,
    `label`, `type`, `placeholder`, `rows` and the `modelValue` to drive its
    value. When a user types, an `update:modelValue` event is emitted so
    v-model bindings on the parent component stay in sync.
  -->
  <div class="relative z-10">
    <!-- Associate the label with the input for accessibility -->
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      {{ label }}
    </label>
    <!-- Use a dynamic component to switch between input and textarea -->
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      :rows="type === 'textarea' ? rows : undefined"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      class="shadow-sm text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-primary-500
      focus:border-primary-500 border border-secondary dark:bg-[#ffffff29] bg-primary"
    />
  </div>
</template>

<script setup>
// Define the component props, including a `modelValue` to enable v-model
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  // For textareas, specify the number of rows. Defaults to 4.
  rows: { type: Number, default: 4 },
  // The current value. Accept both strings and numbers.
  modelValue: { type: [String, Number], default: '' },
});

// Emit the `update:modelValue` event so parent components using v-model
// receive updates when the input changes.
const emit = defineEmits(['update:modelValue']);

// Handler for the input event. It extracts the value from the DOM event
// and emits the update so that v-model works correctly.
function updateValue(event) {
  emit('update:modelValue', event.target.value);
}
</script>