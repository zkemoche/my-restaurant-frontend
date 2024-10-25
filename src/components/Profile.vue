<template>
    <h1 class="text-center">Profile</h1>
  <v-card class="mx-auto" max-width="400" >
    <v-img class="align-end text-grey" height="200" src="../images/charles-etoroma-95UF6LXe-Lo-unsplash.jpg" cover >
      <v-card-title>{{user.name}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{user.user_type}}
    </v-card-subtitle>

    <v-card-text>
      <div>{{user.location}}</div>
      <div>{{user.phone}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text="Edit"></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { userAuthStore } from "@/stores/auth";
    const userStore = userAuthStore();
    const user = userStore.user
</script>