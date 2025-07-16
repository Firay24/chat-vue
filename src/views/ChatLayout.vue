<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useChatStore } from "../stores/chatStore";
import RoomChatCard from "../components/RoomChatCard.vue";
import { formatEpochMinutes } from "../utils/formatEpochMinutes";

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();
const chat = useChatStore();

const user = auth.getUser;
const params = route.params.roomId as string;

const rooms = computed(() => chat.rooms);

const showLogoutModal = ref(false);
const confirmLogout = () => {
  auth.logout();
  showLogoutModal.value = false;
  router.push("/login");
};

const goToDetailRoom = (roomId: string) => {
  router.push(`/chat/${roomId}`);
};

onMounted(() => {
  chat.loadRoomByUserId(auth.user?.id || "");
});
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
        <p class="font-semibold text-xl">{{ user?.name }}</p>
        <div
          @click="showLogoutModal = true"
          class="hover:bg-[#302d3f] p-2 rounded-full cursor-pointer"
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
            class="lucide lucide-power-icon lucide-power hover:text-red-400"
          >
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
          </svg>
        </div>
      </div>

      <!-- modal logout confirm -->
      <!-- Logout Modal -->
      <div
        v-if="showLogoutModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-[#1e1e2e] text-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-triangle-alert-icon lucide-triangle-alert text-gray-700"
          >
            <path
              d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
            />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <p class="text-lg mb-4">Are you sure you want to logout?</p>
          <div class="flex justify-end gap-3">
            <button
              @click="showLogoutModal = false"
              class="px-4 py-2 rounded-full bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              @click="confirmLogout"
              class="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- <p>Admin</p> -->
    </div>
    <div class="flex mt-12 h-[80vh]">
      <aside class="w-full md:w-1/3 overflow-y-auto scrollbar-dark pr-2">
        <!-- Komponen RoomList -->
        <div class="flex flex-col gap-3">
          <RoomChatCard
            v-for="room in rooms"
            :key="room.roomId"
            :msg="room.lastMessage.text"
            :active="room.isRead"
            :name="
              room.participants.find((p) => p.id !== user?.id)?.name ||
              'Unknown'
            "
            :times="formatEpochMinutes(room.lastMessage.timestampSend)"
            @click="goToDetailRoom(room.roomId)"
          />
        </div>
      </aside>
      <main class="w-3/4 hidden md:block">
        <RouterView />
        <div
          v-if="route.path === '/'"
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
