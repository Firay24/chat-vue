import { defineStore } from "pinia";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null as Omit<User, "password"> | null,
    error: "", // untuk tampilkan pesan error login
  }),

  actions: {
    login(email: string, password: string) {
      // dummy users
      const dummyUsers: User[] = [
        {
          id: "user-001",
          name: "Admin John",
          email: "admin@example.com",
          password: "123456",
        },
        {
          id: "user-002",
          name: "Agent Lisa",
          email: "lisa@example.com",
          password: "password",
        },
      ];

      const found = dummyUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (found) {
        this.user = {
          id: found.id,
          name: found.name,
          email: found.email,
        };
        this.isLoggedIn = true;
        this.error = "";
      } else {
        this.error = "Email atau password salah.";
        this.isLoggedIn = false;
      }
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      this.error = "";
    },
  },
});
