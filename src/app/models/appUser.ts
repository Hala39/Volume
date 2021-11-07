import { Message } from 'src/app/models/message';
export class AppUser {
    id: string;
    displayName: string;
    profilePhotoUrl?: string;
    isFollowing?: boolean;
    lastMessageSent?: Message;
    lastMessageReceived?: Message;
    title?: string;
    hometown?: string;
    toShowMessage?: Message;
    userName?: string;
    lastActive?: Date;
}


