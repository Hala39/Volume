import { AppUser } from './appUser';
export class Notification {
    target: AppUser;
    stimulator: AppUser;
    targetId: string;
    stimulatorId: string;
    stimulatorName: string;
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