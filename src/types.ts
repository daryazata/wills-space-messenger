export interface Message {
  id: string;
  senderAvatar: string;
  senderId: string;
  senderName: string;
  sentAt: { seconds: number; nanoseconds: number };
  text: string;
}
