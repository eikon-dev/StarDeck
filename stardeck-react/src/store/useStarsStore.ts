import {create} from "zustand";
import type {StarReward} from "../types/rewards.ts";

interface StarsStore {
    stars: StarReward[],

    createStar: (input: NewStarsInput) => StarReward,
    addReward: (input: NewStarsInput) => void,
    hasDailyReward: (dayKey: string) => boolean,
    hasLongReward: (taskId: string) => boolean,
}

type DailyRewardInput = {
    amount: number,
    dayKey: string,
    kind: 'daily-all',
}

type LongRewardInput = {
    amount: number,
    taskId: string,
    kind: 'long-complete',
}

type NewStarsInput = DailyRewardInput | LongRewardInput;

const useStarsStore = create<StarsStore>((set, get) => ({
    stars: [],

    createStar: (starInput: NewStarsInput) => {
        if (starInput.kind === 'daily-all') {
            return {
                id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
                createdAt: Date.now(),
                kind: starInput.kind,
                dayKey: starInput.dayKey, // dayKey это результат выполнения функции проверки dailyDone
                amount: starInput.amount,
            }
        } else {
            return {
                id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
                taskId: starInput.taskId,
                createdAt: Date.now(),
                kind: starInput.kind,
                amount: starInput.amount,
            }
        }
    },

    addReward: (starInput: NewStarsInput) => {
        const checkDaily = get().hasDailyReward;
        const checkLong = get().hasLongReward;
        const createStar = get().createStar;

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

    hasDailyReward: (dayKey: string) => {
        return get().stars.some(star => star.dayKey === dayKey && star.kind === 'daily-all')
    },

    hasLongReward: (taskId: string) => {
        return get().stars.some(star => star.taskId === taskId && star.kind === 'long-complete')
    },
}))

export default useStarsStore;