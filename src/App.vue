<script setup>
import { RouterView } from 'vue-router'
import NavbarView from './components/NavbarView.vue';
import FooterView from './components/FooterView.vue';
</script>

<template>

  <NavbarView />


  <RouterView />

  <FooterView />

</template>
