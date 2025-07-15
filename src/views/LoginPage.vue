<template>
  <div class="max-w-md mx-auto mt-32">
    <h2 class="text-2xl font-bold mb-4">Login</h2>

    <input
      v-model="email"
      type="email"
      placeholder="Enter your email"
      class="input input-bordered w-full mb-4"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Enter your password"
      class="input input-bordered w-full mb-4"
    />

    <button class="btn btn-primary w-full" @click="handleLogin">Login</button>

    <p v-if="auth.error" class="mt-4 text-red-500">{{ auth.error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();

function handleLogin() {
  auth.login(email.value, password.value);
  if (auth.isLoggedIn) {
    router.push("/");
  }
}
</script>
