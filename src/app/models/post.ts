import { File } from './file';
import { AppUser } from './appUser';
import { Comment } from './comment';
export interface Post {
    id?: number;
    appUser?: AppUser;
    date?: Date;
    file?: File;
    description?: string;
    comments?: Comment[];
    likesCount?: number;
    commentsCount?: number;
    isLikedByUser?: boolean;
    isFollowing?: boolean;
    isSavedByUser?: boolean;
}