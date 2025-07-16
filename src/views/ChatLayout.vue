<script setup lang="ts">
import { useRoute } from "vue-router";
import RoomChatCard from "../components/RoomChatCard.vue";

const route = useRoute();
const params = route.params.roomId as string;
</script>

<template>
  <div class="h-[90vh] my-10 px-6">
    <!-- navbar -->
    <div class="flex justify-between items-center">
      <div class="flex gap-3 items-center">
        <div class="w-8">
          <img src="/logo.png" alt=" logo" />
        </div>
        <p class="font-semibold text-xl">Chat</p>
      </div>
      <div class="flex gap-3 items-center">
        <div class="w-8">
          <img
            src="https://doodleipsum.com/700x700?i=fc734d103a7de613156bdd603038c56b"
            alt=" logo"
          />
        </div>
        <p class="font-semibold text-xl">Admin</p>
      </div>
      <!-- <p>Admin</p> -->
    </div>
    <div class="flex mt-12 h-[80vh]">
      <aside class="w-full md:w-1/3 overflow-y-auto scrollbar-dark pr-2">
        <!-- Komponen RoomList -->
        <div class="flex flex-col gap-3">
          <RoomChatCard
            v-for="i in 10"
            :key="i"
            msg="Hai"
            :active="false"
            name="Admin"
            times="1 h ago"
          />
        </div>
      </aside>
      <main class="w-3/4 hidden md:block">
        <RouterView />
        <div
          v-if="!params"
          class="flex gap-5 flex-col items-center justify-center h-[80vh]"
        >
          <img src="/logo.png" alt="logo" class="opacity-10 w-36" />
          <p class="text-2xl">Connect. Communicate. Collaborate</p>
          <p class="text-gray-500 w-[55%]">
            A powerful chat system designed to bring people together, enable
            seamless communication, and boost collaboration in real-time.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
