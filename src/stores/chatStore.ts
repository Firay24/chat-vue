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

  actions: {
    setRooms(data: Room[]) {
      this.rooms = data;
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
  },
});
