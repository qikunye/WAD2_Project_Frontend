<template>
    <!--
      A simple section header component.  It renders a level-two heading
      with the global section-title class so that styling stays consistent
      throughout the project.  Additional content can be provided via a slot.
    -->
    <h2 class="section-title">
      <slot>{{ title }}</slot>
    </h2>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: '',
    },
  });
  </script>
  
  <!--
    No scoped styles are required here.  The .section-title class is defined
    in the project's global main.css.
  -->
  
