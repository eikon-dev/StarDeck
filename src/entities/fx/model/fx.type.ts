import type {FXRequest} from "@/shared/fx/model/types";

//статусы анимации очередь -> проигрывание -> завершено
export type FXStatus = 'queued' | 'playing' | 'done';

//это заявка на проигрывание анимации для проигрывателя FSM
export type EffectItem = FXMeta & FXRequest;

export type FXMeta = {
    id: string,
    status: FXStatus,
    createdAt: number,
};
