import { UserCard } from './userCard';
import { Post } from "./post";

export interface Comment { 
    postId: number;
    userCard: UserCard;
    content: string;
    date: string;
}