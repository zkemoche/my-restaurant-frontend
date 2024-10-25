import { defineStore } from "pinia";

export const userAuthStore = defineStore("auth", {
    state: () => ({
        // token: localStorage.getItem('user-token') || '', 
        token: null,
        user: null,
    }),
    actions: {
        login(resp){
            localStorage.setItem('user-token', 'Bearer ' + resp.token);
            this.token = resp.token;
            // this.status = 'success';
            // this.hasLoadedOnce = true;
            this.user = resp.user;
          },
          logout(){
            this.token = '';
            localStorage.removeItem('user-token');
          },
      
      
    },
    getters: {
        isAuthenticated: state => !!state.token
    },
    persist:true
})