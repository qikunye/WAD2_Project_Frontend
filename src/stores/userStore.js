import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore("user", {
    state: () => ({
        isLoggedIn: false,
        user: null,
    }),
    actions: {
        async fetchUser() {
            try {
                const res = await axios.get('http://localhost:4000/api/v1/user/me', { withCredentials: true });
                if (res.data.success) {
                    this.isLoggedIn = true;
                    this.user = res.data.user;
                } else {
                    this.isLoggedIn = false;
                    this.user = null;
                }
            } catch (err) {
                this.isLoggedIn = false;
                this.user = null;
            }
        },
        async logout() {
            this.isLoggedIn = false;
            this.user = null; 
        }

    }
})