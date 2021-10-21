import { UserCard } from './userCard';
export interface Post {
    postId: number;
    userCard: UserCard;
    date: string;
    photo: string;
    description: string;
    comments: Comment[];
    likesCount: number;
    isLikedByMe: boolean;
}