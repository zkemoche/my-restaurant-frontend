<template>
      <v-img class="mx-auto my-6" max-width="228" src="../logo.png" ></v-img>
      <v-row justify="center">
      <v-col cols="12" lg="6" md="8" sm="10" >
        <v-card ref="form">

          <v-card-text>
            <v-text-field label="Full Name" placeholder="John Doe" ></v-text-field>
            <v-text-field label="Email" placeholder="johndoe@myemail.com" required ></v-text-field>
            <v-text-field label="Address" placeholder="Madaraka, Nairobi" required ></v-text-field>
            <v-text-field label="Phone" placeholder="TX" required ></v-text-field>
            <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            label="Password"
            @click:append-inner="visible = !visible"
            ></v-text-field>
          </v-card-text>

          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn variant="text" to="/"> Cancel </v-btn>
            <v-spacer></v-spacer>           
            <v-btn color="primary" variant="text" > Submit </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
<script setup>
 
</script>