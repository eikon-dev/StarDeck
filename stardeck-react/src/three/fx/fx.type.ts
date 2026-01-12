export type FXStatus = 'queued' | 'playing' | 'done'; //статусы анимации очередь -> проигрывание -> завершено

//это заявка на проигрывание анимации для проигрывателя FSM
export type EffectItem = FXMeta & FXRequest;

export type FXMeta = {
    id: string,
    status: FXStatus,
    createdAt: number,
};

//TODO: Идея развести FXRequest на констрокцию типа {...StarPayload | ...ShakePayload }  отдельно вынести типы StarPayload = {}
export type FXRequest = StarEffect | ShakeEffect;

export type StarEffect = {
    type: 'star',
    payload: {
        posX: number,
        posY: number,
    },
}

export type ShakeEffect = {
    type: 'shake',
    payload: {
        intensity: number,
        durationMs: number,
    }
}
