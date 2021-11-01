import { AppUser } from './appUser';

export interface Comment { 
    id: number;
    postId: number;
    appUser: AppUser;
    content: string;
    date: Date;
}