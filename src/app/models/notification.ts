import { Guid } from 'guid-typescript';
import { AppUser } from './appUser';
export class Notification {
    id: Guid;
    target: AppUser;
    stimulator: AppUser;
    targetId: string;
    stimulatorId: string;
    stimulatorName: string;
    targetName: string;
    stimulation: Stimulation;
    path: number;
    date: Date;
    seen: boolean;
}

export enum Stimulation {
    like,
    comment, 
    follow
}
