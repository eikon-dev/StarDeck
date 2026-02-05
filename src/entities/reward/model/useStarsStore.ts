import {create} from "zustand";
import type {NewStarsInput, StarReward} from "@/entities/reward/model/types";
import {persist} from "zustand/middleware";

//TODO: Current version v1, wait v2
//TODO: применить другой подход в реализации createStar, использовать другую типизацию

interface StarsStore {
    stars: StarReward[],
    hasHydrated: boolean,

    setHasHydrated: () => void,

    createStar: (input: NewStarsInput) => StarReward,
    addReward: (input: NewStarsInput) => void,
    hasDailyReward: (dayKey: string) => boolean,
    hasLongReward: (taskId: string) => boolean,
}

export const useStarsStore = create<StarsStore>()(
    persist(
        (set, get) => ({
            stars: [],

            hasHydrated: false,

            setHasHydrated: () => set({hasHydrated: true}),

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
            //Todo: addReward стоит вопрос о вынесении логики из стора
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
        }), {
            name: "stars-store",

            partialize: (state) => ({
                stars: state.stars
            }),

            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error(error);
                    return;
                }

                state?.setHasHydrated();
            }
        }
    )
)