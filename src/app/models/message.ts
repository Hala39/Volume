import { Guid } from "guid-typescript";
export interface Message {
    id: Guid;
    content: string;
    sentAt?: Date;
    seen?: boolean;
    senderDisplayName: string;
    recipientId: string;
    senderId?: string;
    senderDeleted?: boolean;
    recipientDeleted?: boolean;
    guid?: Guid;
}