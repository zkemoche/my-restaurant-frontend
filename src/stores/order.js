import { defineStore } from "pinia";

export const orderStore = defineStore("orders", {
    state: () => ({
        current_order: [],
        current_order_total: 0
    }),
    actions: {
        add(order){
            //check if order item is in cart
            order.quantity = 1
            this.current_order_total += order.price
            if (this.current_order.length ===0){                    
                        this.current_order.push(order);
                }else{
                    this.current_order.forEach((all_orders) => {                    
                        if(order.id == all_orders.id){
                            all_orders.quantity +=1                        
                        }else{
                            this.current_order.push(order);
                        }
                    });                
                }
        },
        remove(order){
            this.current_order.pop(order);
            this.current_order_total -= order.price
        },
        clear_order(){
        this.current_order = '';
        this.current_order_total = 0;
        },
    },
    getters: {
    },
    persist:true
})