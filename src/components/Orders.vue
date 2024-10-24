<template>
    <h1 align="center">Orders</h1>
    <!-- Order Details -->
    <div>
        <v-card class="mx-auto my-12" max-width="700" >
            <v-card-item>
                    <v-card-title class="text-center">Current Order</v-card-title>
                </v-card-item>
                <!-- for loop through the order items -->
                <v-row>
                    <v-col cols="12" md="4"  v-for="order_item in order.order_details" :key=order_item>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">{{order_item.menu_name}}</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{order_item.menu_price}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-card-text>
                    <div class="my-4 text-subtitle-1 text-right">{{order.order_total}}</div>
                </v-card-text>

                <v-card-text>
                    <div class="my-4 text-subtitle-1">Order Type: {{order.order_type}}</div>
                    <div class="my-4 text-subtitle-1">Order Status: {{ order.order_status }}</div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>
                <v-card-actions>
                    <v-btn color="deep-purple-lighten-2" text="Pay" block border @click="pay_dialog = true"></v-btn>
                </v-card-actions>

        </v-card>
    </div>
    <!-- Payment dialog -->
    <v-dialog v-model="pay_dialog" width="auto">
        <v-card  width="700">
            <v-card-item>
                <v-card-title class="text-center">Pay for your order <v-btn @click="pay_dialog = false" >X</v-btn></v-card-title>
            </v-card-item>

            <v-card-text>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Customer</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{order.user.name}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Shipping to</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{order.user.location}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Pay Via</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">Mpesa</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Phone Number</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{order.user.phone}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class=" text-subtitle-1">Amount</div> </v-col>
                                <v-col class="md-4"> <div class=" text-subtitle-1 text-right">{{order.order_total}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-actions>
                <v-btn color="deep-purple-lighten-2" text="Complete Payment" block border></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    
    const pay_dialog = ref(false)
    const order = ref([] )
   
    async function fetchOrder() {
        const orderResponse = await axios.get('http://127.0.0.1:8000/api/getOrderDetails/1')
        // console.log(orderResponse.data)
        order.value = orderResponse.data
    }

    //To Do
    //Complete payment
    function complete_order(){
        //send to payments controller
    }

    //List other orders
    function fetch_all_orders(){
        
    }
    onMounted(async () => {
        await fetchOrder()
    })
</script>