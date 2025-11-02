import type {Priority} from "./task.ts";

export type RewardKind = 'daily-all' | 'long-complete';

export type StarReward = {
    id: string;
    createAt: number;
    dayKey: string;
    kind: RewardKind;
    amount: number;
    taskId?: string;
    priorityArAward?: Priority;
};