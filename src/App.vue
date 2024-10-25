<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <v-app>
    <Navbar v-if="!['login', 'register'].includes($route.name)"/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>

</template>

