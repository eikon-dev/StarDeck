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