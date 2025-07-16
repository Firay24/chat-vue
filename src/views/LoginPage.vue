<template>
  <div class="mx-auto max-w-md">
    <div class="w-32 mx-auto">
      <img src="/logo.png" alt="logo" />
    </div>
    <h2 class="text-3xl font-semibold mt-4 mb-8">Sign in to Chat</h2>

    <form
      @submit.prevent="handleLogin"
      class="w-full bg-gray-800 px-4 py-6 rounded-lg"
    >
      <div class="mb-4 w-full">
        <div class="w-full flex items-start mb-2">
          <label for="email" class="">Email address</label>
        </div>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="input input-bordered w-full rounded-full"
        />
      </div>

      <div class="mb-4 w-full">
        <div class="w-full flex items-start mb-2">
          <label for="password" class="">Password</label>
        </div>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="input input-bordered w-full rounded-full"
        />
      </div>

      <button
        class="btn btn-primary w-full rounded-full mt-2 text-semibold"
        @click="handleLogin"
      >
        Sign in
      </button>
    </form>

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
