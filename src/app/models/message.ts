
export interface Message {
    id: number;
    content: string;
    sentAt?: Date;
    seenAt?: Date;
    seen?: boolean;
    senderDisplayName: string;
    recipientId: string;
    senderId?: string;
    senderDeleted?: boolean;
    recipientDeleted?: boolean;
}