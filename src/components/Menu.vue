<template>
    <h1 align="center">Menu</h1>
    <v-btn color="deep-purple-lighten-2" text="My Order" block border @click="order_dialog = true"></v-btn>
<!-- menu list -->
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
                    <v-snackbar :timeout="2000" color="blue-grey" rounded="pill" >
                        <template v-slot:activator="{ props }">
                            <v-btn color="deep-purple-lighten-2" text="Order" block border @click="current_order.add(menu_item)"></v-btn>
                        </template>
                        Added to order.
                </v-snackbar>
                </v-card-actions>
                

            </v-card>
        </v-col>
        </v-row>
    </div>
<!-- new order -->
<v-dialog v-model="order_dialog" width="auto">
        <v-card  width="700">
            <v-card-item>
                <v-card-title class="text-center">Review your order <v-btn @click="order_dialog = false" >X</v-btn></v-card-title>
            </v-card-item>
            <v-card-text>
                <v-row>
                    <v-col>                    
                        <v-card-text class="my-4 text-subtitle-1">Order Items</v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4"  v-for="order_item in current_order.current_order" :key=order_item>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">{{order_item.name}}</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{order_item.price}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Order Type</div> </v-col>
                                <v-col class="md-4"> 
                                    <div class="my-4 text-subtitle-1 text-right">
                                        <v-select
                                            label="Select"
                                            :items="['Take Away', 'Dine in']"
                                            v-model="order.order_type"
                                        ></v-select>
                                    </div> 
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
               
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class=" text-subtitle-1">Amount</div> </v-col>
                                <v-col class="md-4"> <div class=" text-subtitle-1 text-right">{{ order.order_total }}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-actions>
                <v-btn color="deep-purple-lighten-2" text="Make Order" block border @click="make_order()" ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { orderStore } from "@/stores/order";
    import { userAuthStore } from "@/stores/auth";
   
    const current_order = orderStore();
    const userStore = userAuthStore();
    const user = userStore.user
    
    const order_dialog = ref(false)
    const menu = ref([] )
    const order = ref({
        order_details: current_order.current_order,
        order_total: current_order.current_order_total,
        user_id: user.id, //gets the user who's logged in
        order_type: null, //change form to use input field
    })
   
    async function fetchMenu() {
        const menuResponse = await axios.get('http://127.0.0.1:8000/api/menus')
        menu.value = menuResponse.data
    }

    function make_order(){
        //Send to backend
        axios
            .post('http://127.0.0.1:8000/api/orders', order.value)
            .then((response) => console.log(response))
        order_dialog.value = false
    }

    onMounted(async () => {
        await fetchMenu()
    })
    
</script>