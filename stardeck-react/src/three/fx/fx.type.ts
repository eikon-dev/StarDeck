export type FXStatus = 'queued' | 'playing' | 'done'; //статусы анимации очередь -> проигрывание -> завершено

//это заявка на проигрывание анимации для проигрывателя FSM
export type FXMeta = {
    id: string,
    status: FXStatus,
    createdAt: number,
};

export type FXRequest = {
    type: 'star',
    payload: {
        posX: number,
        posY: number,
    },
} | {
    type: 'shake',
    payload: {
        intensity: number,
        durationMs: number,
    },
}
export type EffectItem = FXMeta & FXRequest;