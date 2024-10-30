<template>
    <h1 align="center">Orders</h1>
    <!-- Order Details -->
    <div>
        
        <v-card class="mx-auto my-12" max-width="600" >
            
                <v-list lines="one">
                    <v-list-item
                        v-for="order in orders"
                        :key="order"
                        :title="'Order No ' + order.id"
                        :subtitle="'Order Status:' + order.order_status"
                    >
                    <template v-slot:append v-if="order.order_status == 'Not Paid'">
                        <v-btn color="deep-purple-lighten-2" text="Pay" block border @click="show_payment(order)"></v-btn>
                    </template>
                    </v-list-item>
                </v-list>
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
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{payment.user.name}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Shipping to</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{payment.user.location}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4"  v-for="order_item in payment.order_details" :key=order_item>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">{{order_item.menu_name}}</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{order_item.menu_price}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Pay Via</div> </v-col>
                                <v-col class="md-4"> 
                                    <div class="my-4 text-subtitle-1 text-right">
                                        <v-select
                                            label="Select"
                                            :items="['Cash', 'Mpesa','Card']"
                                            v-model="payment.payment_type"
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
                                <v-col class="md-6"> <div class="my-4 text-subtitle-1">Phone Number</div> </v-col>
                                <v-col class="md-4"> <div class="my-4 text-subtitle-1 text-right">{{payment.user.phone}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>                    
                        <v-card-text>
                            <v-row>
                                <v-col class="md-6"> <div class=" text-subtitle-1">Amount</div> </v-col>                                
                                <v-col class="md-4"> <div class=" text-subtitle-1 text-right">{{payment.order_total}}</div> </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-actions>
                <v-btn color="deep-purple-lighten-2" to= "/home" text="Complete Payment" block border @click="complete_order()"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { userAuthStore } from "@/stores/auth";
    import { orderStore } from "@/stores/order";

    
    const pay_dialog = ref(false)
    const orders = ref([])
    const userStore = userAuthStore();
    const current_order = orderStore();
    const user = userStore.user


    const payment = ref({
        order_id  : null,
        user: null,
        order_details: null,
        payment_type : null, //change form to use input field
        amount : null, 
        user_id : user.id, //get logged in user's id
        payment_status : "Paid"
    })
   
    async function fetchOrder() {
        const orderResponse = await axios.get('http://127.0.0.1:8000/api/getOrderDetails/1')
        orders.value = orderResponse.data
    }

    //pass order info to pay dialog
    function show_payment(order){
        payment.value.order_id = order.id
        payment.value.amount = order.order_total
        payment.value.user = order.user
        payment.value.order_details = order.order_details
        
        pay_dialog.value = true
    }
    //Complete payment
    function complete_order(){
        axios
            .post('http://127.0.0.1:8000/api/payments', payment.value)
            .then((response) => {
                console.log(response)
                current_order.current_order = null
                current_order.current_order_total = null
            })
        pay_dialog.value = false
    }

    onMounted(async () => {
        await fetchOrder()
    })
</script>