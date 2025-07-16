import { defineStore } from "pinia";
import rawData from "../data/listRooms.json";

interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderType: string;
  text: string;
  timestampSend: number;
  timestampRead: number;
  isRead: boolean;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  password: string;
}

interface Room {
  roomId: string;
  isRead: boolean;
  participants: Participant[];
  lastMessage: Message;
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
      return state.rooms.find((r) => r.roomId === state.selectedRoomId);
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

    loadRoomByUserId(userId: string) {
      const data = rawData.data;

      const filteredRooms: Room[] = data.customerRooms.filter((room: any) => {
        return room.participants.some((p: any) => p.id === userId);
      });

      this.setRooms(filteredRooms);
    },
  },
});
