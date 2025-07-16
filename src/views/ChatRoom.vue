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
        <div
          v-for="message in sortedMessages"
          :key="message.id"
          :class="message.senderId === user?.id ? 'self-end' : 'self-start'"
        >
          <ProductCard v-if="message.productId" :id="message.productId" />
          <BubleChat
            v-else
            :msg="message.text"
            :isSender="message.senderId === user?.id"
          />
        </div>
      </div>

      <!-- modal product -->
      <teleport to="body">
        <div
          v-if="showModalProduct"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-[#221f2e] rounded-lg max-w-lg w-full p-5">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-bold">Pilih Produk</h2>
              <button
                @click="showModalProduct = false"
                class="text-gray-500 hover:text-white text-xl border-none active:border-none active:outline-none"
              >
                &times;
              </button>
            </div>

            <div
              class="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-4"
            >
              <div
                v-for="product in products"
                :key="product.id"
                class="cursor-pointer bg-[#252331] border border-[#302d3f] rounded-lg p-2 hover:bg-[#302d3f]"
                @click="sendMessage('', product.id)"
              >
                <img
                  :src="product.image"
                  alt=""
                  class="w-52 h-52 object-cover rounded mb-2"
                />
                <p class="font-semibold ml-2">{{ product.name }}</p>
                <p class="text-xl ml-2 font-semibold">
                  Rp {{ product.price.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </teleport>

      <!-- footer chat -->
      <form
        @submit.prevent="sendMessage(newMessage, '')"
        class="flex justify-between border-t border-[#302d3f] pt-2"
      >
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message"
          class="bg-transparent active:border-none focus:outline-none w-full"
        />

        <div
          @click="showModalProduct = true"
          class="cursor-pointer p-2 hover:bg-[#302d3f] rounded-full"
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
            class="lucide lucide-shopping-bag-icon lucide-shopping-bag"
          >
            <path d="M16 10a4 4 0 0 1-8 0" />
            <path d="M3.103 6.034h17.794" />
            <path
              d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"
            />
          </svg>
        </div>
        <button
          type="submit"
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
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useChatStore } from "../stores/chatStore";
import { useAuthStore } from "../stores/authStore";
import BubleChat from "../components/BubleChat.vue";
import ProductCard from "../components/ProductCard.vue";
import data from "../data/listRooms.json";

const auth = useAuthStore();
const chatStore = useChatStore();

const user = auth.getUser;
const newMessage = ref("");
const showModalProduct = ref(false);
const roomId = useRoute().params.roomId as string;
const products = computed(() => data.data.product);

const sortedMessages = computed(() =>
  chatStore.getSortedMessagesByRoomId(roomId)
);
const info = computed(() =>
  chatStore.getOtherParticipantInfo(roomId, user?.id || "")
);

function sendMessage(message?: string, productId?: string) {
  const trimmedMessage = message?.trim() ?? "";
  if (!trimmedMessage && !productId) return;
  showModalProduct.value = false;

  chatStore.addMessageToRoom(
    roomId,
    trimmedMessage,
    user?.id || "",
    user?.role || "",
    productId
  );

  newMessage.value = "";
}

onMounted(() => {
  if (!chatStore.rooms.length) {
    chatStore.loadRoomsFromStorage();
  }
});
</script>
