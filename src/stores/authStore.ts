import { defineStore } from "pinia";
import data from "../data/listRooms.json";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null as Omit<User, "password"> | null,
    error: "", // untuk tampilkan pesan error login
  }),

  getters: {
    getUser: (state) => state.user,
    getError: (state) => state.error,
  },

  actions: {
    login(email: string, password: string) {
      // dummy users
      const dummyUsers: User[] = data.data.customer;

      const found = dummyUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (found) {
        this.user = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          avatar: found.avatar,
        };
        this.isLoggedIn = true;
        this.error = "";

        localStorage.setItem("authUser", JSON.stringify(this.user));
        localStorage.setItem("authIsLoggedIn", "true");
      } else {
        this.error = "Email atau password salah.";
        this.isLoggedIn = false;
      }
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      this.error = "";

      localStorage.removeItem("authUser");
      localStorage.removeItem("authIsLoggedIn");
    },

    restoreAuthFromLocalStorage() {
      const savedUser = localStorage.getItem("authUser");
      const loggedIn = localStorage.getItem("authIsLoggedIn") === "true";

      if (savedUser && loggedIn) {
        this.user = JSON.parse(savedUser);
        this.isLoggedIn = true;
      }
    },
  },
});
