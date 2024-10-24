<template>
    <h1 align="center">Menu</h1>

    <div>
        <v-row>
        <v-col cols="12" md="4"  v-for="menu_item in menu" :key=menu_item>     
            <!-- <v-col>      -->
            <v-card class="mx-auto my-12" max-width="450" >
                <!-- <v-img height="250" :src="product.productImagePath" cover ></v-img> -->
                <v-img height="250" src="../images/allen-rad-9G_oJBKwi1c-unsplash.jpg" cover ></v-img>

                <v-card-item>
                    <v-card-title>{{ menu_item.name }}</v-card-title>
                </v-card-item>

                <v-card-text>
                    <div class="my-4 text-subtitle-1">{{ menu_item.price }}</div>
                    <div>{{ menu_item.description }}</div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>
                <v-card-actions>
                    <v-btn color="deep-purple-lighten-2" text="Order" block border></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        </v-row>
    </div>

</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    
    const menu = ref([] )
   
    async function fetchMenu() {
        const menuResponse = await axios.get('http://0.0.0.0/api/menu')
        console.log(menuResponse.data)
        menu.value = menuResponse.data
    }

    // to do
    // add order
    onMounted(async () => {
        await fetchMenu()
    })
    
</script>