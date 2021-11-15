import { File } from 'src/app/models/file';
export class SavedPost {
    id: number;
    ownerDisplayName: string;
    description: string;
    savedAt: Date;
    file: File;

} 