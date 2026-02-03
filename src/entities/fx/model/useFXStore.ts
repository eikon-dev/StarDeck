import {create} from "zustand";
import type {EffectItem} from "@/entities/fx/model/fx.type";
import type {FXRequest} from "@/shared/fx/model/types";

interface FXStore {
    queue: EffectItem[], //Сюда записываем очередь для воспроизведения
    history: EffectItem[], //История для проигранных эффектов

    createEffectItem: (request: FXRequest) => void,
    //записывает в очередь заявку на воспроизведение анимации
    start: (id: string) => void,
    finish: (id: string) => void,
}

const useFXStore = create<FXStore>((set) => ({
    queue: [],
    history: [],

    createEffectItem: (request: FXRequest) => {
        const effectItem: EffectItem = {
            id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
            status: 'queued',
            createdAt: Date.now(),
            ...request
        }

        set((s) => ({
            queue: [...s.queue, effectItem],
        }))
    },

    start: (id) => {
        set((s) => ({
            queue: s.queue.map((item) => item.id === id ? {...item, status: 'playing'} : item),
        }));
    },

    finish: (id) => {
        set((s) => {
            const effect = s.queue.find((item) => item.id === id);
            if (!effect) return s;

            const doneEffect: EffectItem = {...effect, status: 'done'};

            return {
                queue: s.queue.filter((item) => item.id !== id),
                history: [...s.history, doneEffect].slice(-50), //TODO: Подумать о HISTORY_LIMIT = 50
            };
        });
    },

}));

export default useFXStore;
