import { UserCard } from './userCard';
import { AppUser } from './appUser';
export interface Chat {
    sender: UserCard;
    receiver?: UserCard;
    content: string;
    date: string;
}