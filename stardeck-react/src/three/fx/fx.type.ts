// export type FXType = 'star' | 'shake'; //виды анимаций
export type FXStatus = 'queued' | 'playing' | 'done'; //статусы анимации очередь -> проигрывание -> завершено

export type StarEffectItem = {
    id: string,
    type: 'star', //тип эффекта, который должен проиграть FSM
    status: FXStatus,
    createdAt: number,
    payload: {
        posY: number,
        posX: number,
    },
};

export type ShakeEffectItem = {
    id: string,
    type: 'shake', //тип эффекта, который должен проиграть FSM
    status: FXStatus,
    createdAt: number,
    payload: {
        intensity: number,
        durationMs: number,
    },
};

//это заявка на проигрывание анимации для проигрывателя FSM
export type EffectItem = StarEffectItem | ShakeEffectItem ;