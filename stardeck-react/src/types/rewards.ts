export type RewardKind = 'daily-all' | 'long-complete';

export type StarReward = {
    id: string;
    createdAt: number;
    dayKey?: string;
    kind: RewardKind;
    amount: number;
    taskId?: string;
};