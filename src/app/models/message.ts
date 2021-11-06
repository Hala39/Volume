
export interface Message {
    id: number;
    content: string;
    sentAt?: Date;
    seenAt?: Date;
    file?: File;
    isPhoto: boolean;
    senderDisplayName: string;
    recipientId: string;
    senderId?: string;
    senderDeleted?: boolean;
    recipientDeleted?: boolean;
}