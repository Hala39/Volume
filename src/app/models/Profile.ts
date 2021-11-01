import { File } from './file';
import { Post } from "./post";

export class Profile {
    displayName?: string;
    phoneNumber?: string;
    title?: string;
    dob?: string;
    hometown?: string;
    gender?: string;
    profilePhotoUrl?: string;
    coverPhotoUrl?: string;
    posts?: Post[] = [];
    photos?: File[] = [];
}