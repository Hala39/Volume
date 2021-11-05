import { File } from './file';
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
    profilePhotoUrl?: string;
    posts?: Post[] = [];
}