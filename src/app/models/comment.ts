import { Guid } from 'guid-typescript';
import { AppUser } from './appUser';

export interface Comment { 
    id?: Guid;
    postId: number;
    appUser: AppUser;
    content: string;
    date: Date;
}