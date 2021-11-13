import { Post } from "./post";

export class Profile {
    id?: string;
    displayName?: string;
    phoneNumber?: string;
    title?: string;
    dob?: string;
    hometown?: string;
    gender?: string;
    isFollowing?: boolean;
    userName?: string;
    lastActive?: Date;
    profilePhotoUrl?: string;
    posts?: Post[] = [];
    joinedAt?: Date;
}