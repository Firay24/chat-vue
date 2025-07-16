import { defineStore } from "pinia";
import rawData from "../data/listRooms.json";
import generateId from "../utils/generateId";

interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderType: string;
  text: string;
  timestampSend: number;
  timestampRead: number;
  isRead: boolean;
  productId: string;
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

  actions: {
    setRooms(data: Room[]) {
      this.rooms = data;
      localStorage.setItem("chat_rooms", JSON.stringify(data));
    },

    setMessages(roomId: string, data: Message[]) {
      this.messages[roomId] = data;
      localStorage.setItem(`messages_${roomId}`, JSON.stringify(data));
    },

    loadRoomByUserId(userId: string) {
      const data = rawData.data;

      const filteredRooms: Room[] = data.customerRooms.filter((room: any) => {
        return room.participants.some((p: any) => p.id === userId);
      });

      this.setRooms(filteredRooms);
    },

    loadRoomsFromStorage() {
      const stored = localStorage.getItem("chat_rooms");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Room[];
          this.rooms = parsed;
        } catch (e) {
          console.error("Failed to parse chat_rooms:", e);
        }
      }
    },

    getSortedMessagesByRoomId(roomId: string): Message[] {
      if (this.messages[roomId]) {
        return this.messages[roomId]
          .slice()
          .sort((a, b) => a.timestampSend - b.timestampSend);
      }

      const stored = localStorage.getItem(`messages_${roomId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Message[];
          this.setMessages(roomId, parsed); // ⬅️ juga simpan ke state
          return parsed
            .slice()
            .sort((a, b) => a.timestampSend - b.timestampSend);
        } catch (e) {
          console.error("Failed to parse localStorage for", roomId, e);
        }
      }

      const allMessages: Message[] = rawData.data.message;
      const filtered = allMessages.filter((msg) => msg.roomId === roomId);

      this.setMessages(roomId, filtered);

      return filtered.slice().sort((a, b) => a.timestampSend - b.timestampSend);
    },

    getOtherParticipantInfo(
      roomId: string,
      userId: string
    ): { name: string; role: string } | null {
      const room = this.rooms.find((room) => room.roomId === roomId);
      if (!room) return null;

      const other = room.participants.find((p) => p.id !== userId);
      if (!other) return null;

      return {
        name: other.name,
        role: other.role,
      };
    },

    addMessageToRoom(
      roomId: string,
      message: string = "",
      senderId: string,
      senderType: string,
      productId: string = ""
    ) {
      const newMessage = {
        id: generateId(),
        roomId: roomId,
        senderId: senderId,
        senderType: senderType,
        text: message ?? "",
        timestampSend: Date.now() / 1000 / 60,
        timestampRead: 0,
        isRead: false,
        productId: productId,
      };

      const existing = this.messages[roomId] || [];
      const updated = [...existing, newMessage];

      this.setMessages(roomId, updated);
    },
  },
});
