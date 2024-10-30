<template>
   <v-app-bar color="warning" density="compact">
        <v-app-bar-title>MyRestaurant</v-app-bar-title>
        <v-btn to="/home" primary >Home</v-btn>
        <v-btn to="/menu" primary >Menu</v-btn>
        <v-btn to="/orders" primary >Orders</v-btn>
        <v-menu min-width="200px" rounded >
            <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" >
                    <v-avatar color="white" size="large"> <span class="text-h5" color="white">{{ user.name.charAt(0) }}</span> </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <div class="mx-auto text-center">
                        <v-avatar color="orange" > <span class="text-h5">{{ user.name.charAt(0) }}</span> </v-avatar>
                        <h3>{{ user.name }}</h3>
                        <p class="text-caption mt-1"> {{ user.email }} </p>
                        <v-divider class="my-3"></v-divider>
                        <v-btn variant="text" rounded to = "/profile"> View Profile </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn variant="text" rounded @click="logout"> Logout </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>
<script setup>
import router from "@/router";
import { userAuthStore } from "@/stores/auth";
    const userStore = userAuthStore();
    const user = userStore.user

    function logout() {
        userStore.logout();
        router.push({ name: "login" });
    }
</script>