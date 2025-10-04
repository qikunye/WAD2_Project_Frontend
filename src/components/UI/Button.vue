<template>
  <!--
    A simple button component that uses the primary button styling defined
    in your global styles.css.  It emits a native click event when
    pressed and falls back to the provided label if no slot content is
    given.
  -->
  <button
    :type="type"
    class="btn-primary"
    @click="$emit('click')"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
// Accept a label for fallback text and a button type.  Additional
// attributes (e.g., disabled) can be passed directly when using the component.
const props = defineProps({
  label: {
    type: String,
    default: 'Button',
  },
  type: {
  type: String,
    default: 'button',
  },
});
</script>

<!--
  No scoped styles are needed here because the appearance is controlled
  by the .btn-primary class defined in styles.css.
-->
