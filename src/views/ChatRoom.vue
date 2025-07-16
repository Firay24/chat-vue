<template>
  <div>
    <!-- <h2 class="text-lg font-bold mb-2">Room: {{ roomId }}</h2> -->
    <div
      class="flex flex-col gap-4 px-5 bg-[#252331] py-2 rounded-xl h-[80vh] ml-5"
    >
      <!-- header chat -->
      <div class="flex gap-3 items-center border-b pb-2 border-[#302d3f]">
        <div class="w-16">
          <img
            src="https://doodleipsum.com/700x700?i=fc734d103a7de613156bdd603038c56b"
            alt=" logo"
          />
        </div>
        <div class="flex flex-col items-start">
          <p class="font-semibold text-xl">{{ info?.name }}</p>
          <p class="text-gray-500">{{ info?.role }}</p>
        </div>
      </div>

      <!-- main chat -->
      <div class="flex flex-col gap-2 h-[83%]">
        <BubleChat
          v-for="message in sortedMessages"
          :key="message.id"
          :msg="message.text"
          :isSender="message.senderId === user?.id"
        />
      </div>

      <!-- footer chat -->
      <div class="flex justify-between border-t border-[#302d3f] pt-2">
        <input
          type="text"
          placeholder="Type a message"
          class="bg-transparent active:border-none focus:outline-none w-full"
        />

        <div
          class="text-white cursor-pointer p-2 hover:bg-[#302d3f] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-send-horizontal-icon lucide-send-horizontal"
          >
            <path
              d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
            />
            <path d="M6 12h16" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useChatStore } from "../stores/chatStore";
import { useAuthStore } from "../stores/authStore";
import BubleChat from "../components/BubleChat.vue";

const auth = useAuthStore();
const chatStore = useChatStore();

const user = auth.getUser;
const roomId = useRoute().params.roomId as string;

const sortedMessages = chatStore.getSortedMessagesByRoomId(roomId);
const info = chatStore.getOtherParticipantInfo(roomId, user?.id || "");
</script>
