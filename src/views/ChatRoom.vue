<template>
  <div>
    <h2 class="text-lg font-bold mb-2">Room: {{ roomId }}</h2>
    <!-- Chat Bubble & Chat Input di sini -->
    <p>chat room</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const roomId = useRoute().params.roomId as string;
</script>
