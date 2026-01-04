import {create} from "zustand";

type FXType = 'star' | 'shake'; //виды анимаций
type FXStatus = 'queued' | 'playing' | 'done'; //статусы анимации очередь -> проигрывание -> завершено


//это заявка на проигрывание анимации для проигрывателя FSM
type EffectItem = {
    id: string,
    type: FXType, //тип эффекта, который должен проиграть FSM
    status: FXStatus,
    createdAt: number,
    payload: {
        posY: number,
        posX: number,
    }
    //TODO: Добавить Payload: {}, он говорит как показывать анимацию отдает стартовые параметры
}


interface FXStore {
    queue: EffectItem[], //Сюда записываем очередь для воспроизведения
    history: EffectItem[], //История для проигранных эффектов

    createEffectItem: (newEffectItem: EffectItem) => void, //записывает в очередь заявку на воспроизведение анимации
    start: (id: string) => void,
    finish: (id: string) => void,
}

const useFXStore = create<FXStore>((set, get) => ({
    queue: [],
    history: [],

    createEffectItem: (newEffectItem: EffectItem) => {

        const effectItem: EffectItem = {
            id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
            type: newEffectItem.type,
            status: 'queued',
            createdAt: Date.now(),
            payload: newEffectItem.payload,
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

            const doneEffect: EffectItem = { ...effect, status: 'done' };

            return {
                queue: s.queue.filter((item) => item.id !== id),
                history: [...s.history, doneEffect],
            };
        });
    },

}));

export default useFXStore;
