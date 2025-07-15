import { defineStore } from "pinia";

interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  sender_type: "customer" | "admin";
  text: string;
  timestamp: string;
  is_read: boolean;
}

interface Room {
  room_id: string;
  customer: {
    id: string;
    name: string;
    avatar: string;
  };
  agent: {
    id: string;
    name: string;
  };
  last_message: Message;
  is_read: boolean;
  source: string;
  room_badge: string | null;
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    rooms: [] as Room[],
    messages: {} as Record<string, Message[]>, // key: room_id
    selectedRoomId: "",
    isLoggedIn: false,
  }),

  getters: {
    selectedRoom(state): Room | undefined {
      return state.rooms.find((r) => r.room_id === state.selectedRoomId);
    },
    currentMessages(state): Message[] {
      return state.messages[state.selectedRoomId] ?? [];
    },
  },

  actions: {
    setRooms(data: Room[]) {
      this.rooms = data;
    },

    setMessages(roomId: string, data: Message[]) {
      this.messages[roomId] = data;
    },

    selectRoom(id: string) {
      this.selectedRoomId = id;
    },

    login() {
      this.isLoggedIn = true;
    },

    logout() {
      this.isLoggedIn = false;
      this.selectedRoomId = "";
    },
  },
});
