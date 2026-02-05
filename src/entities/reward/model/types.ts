export type RewardKind = 'daily-all' | 'long-complete';

export type StarReward = {
    id: string;
    createdAt: number;
    dayKey?: string;
    kind: RewardKind;
    amount: number;
    taskId?: string;
};

export type NewStarsInput = DailyRewardInput | LongRewardInput;

type DailyRewardInput = {
    amount: number,
    dayKey: string,
    kind: 'daily-all',
};

type LongRewardInput = {
    amount: number,
    taskId: string,
    kind: 'long-complete',
};