import {create} from "zustand";
import type {RewardKind, StarReward} from "../types/rewards.ts";

interface StarsStore {
    stars: StarReward[],

    addReward: (input: NewStarsInput) => void,
    hasDailyReward: (dayKey: number) => boolean,
    hasLongReward: (taskId: string) => boolean,
}

type NewStarsInput = {
    amount: number,
    taskId: string,
    dayKey: number,
    kind: RewardKind,
}

const useStarsStore = create<StarsStore>((set, get) => ({
    stars: [],

    addReward: (starInput: NewStarsInput,) => {
        const checkDaily = get().hasDailyReward;
        const checkLong = get().hasLongReward;
        const createStar = (starInput: NewStarsInput) => {
            return {
                id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
                taskId: starInput.taskId,
                createdAt: Date.now(),
                kind: starInput.kind,
                dayKey: starInput.dayKey, // dayKey это результат выполнения функции проверки dailyDone
                amount: starInput.amount,
            }
        };

        if (starInput.kind === 'daily-all') {
            if (!checkDaily(starInput.dayKey)) {
                const star: StarReward = createStar(starInput)
                set(s => ({
                    stars: [...s.stars, star]
                }))
            }
        }

        if (starInput.kind === 'long-complete') {
            if (!checkLong(starInput.taskId)) {
                const star: StarReward = createStar(starInput)
                set(s => ({
                    stars: [...s.stars, star]
                }))
            }
        }
    },

    hasDailyReward: (dayKey: number) => {
        return get().stars.some(star => star.dayKey === dayKey && star.kind === 'daily-all')
    },

    hasLongReward: (taskId: string) => {
        return get().stars.some(star => star.taskId === taskId && star.kind === 'long-complete')
    },
}))