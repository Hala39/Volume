import { UserCard } from './userCard';
import { Post } from './post';
export interface AppUser {
    userCard: UserCard;
    posts: Post[];
    following: UserCard[];
    followers: UserCard[];
}