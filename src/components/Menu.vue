<template>
    <h1 align="center">Menu</h1>
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
                    <v-btn color="deep-purple-lighten-2" text="Order" block border @click="show_order(menu_item)"></v-btn>>
                </v-card-actions>
            </v-card>
        </v-col>
        </v-row>
    </div>
<!-- new order -->
<v-dialog v-model="order_dialog" width="auto">
        <v-card  width="700">
            <v-card-item>
                <v-card-title class="text-center">Review for your order <v-btn @click="order_dialog = false" >X</v-btn></v-card-title>
            </v-card-item>
            <v-card-text>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Menu item</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{ order.menu_item }}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Order Type</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">delivery</div> </v-col>
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
                <v-btn color="deep-purple-lighten-2" to="orders" text="Make Order" block border @click="make_order()" ></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    
    const order_dialog = ref(false)
    const menu = ref([] )
    
    const order = ref({
        menu_id: null,
        menu_item: null,
        order_quantity:1, //change form to use input field
        order_total: null,
        user_id: 3,
        order_type: 'Delivery', //change form to use input field
        order_status:'Preparing'

    })
   
    async function fetchMenu() {
        const menuResponse = await axios.get('http://127.0.0.1:8000/api/menus')
        // console.log(menuResponse.data)
        menu.value = menuResponse.data
    }

    // add order
    function show_order(menu){
        order.value.menu_id = menu.id
        order.value.menu_item = menu.name
        order.value.order_total = menu.price
        
        order_dialog.value = true
        // console.log(menu)
    }
    //new order = create a dialog form: user (4), Order type dropdown = Delivery, order status = preparing order total = menu price
    function make_order(){
        // console.log(order.value)
        //Send to backend
        axios
            .post('http://127.0.0.1:8000/api/orders', order.value)
            .then((response) => console.log(response))
        }

    onMounted(async () => {
        await fetchMenu()
    })
    
</script>