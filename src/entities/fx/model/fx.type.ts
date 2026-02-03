import * as THREE from "three";

export type FXStatus = 'queued' | 'playing' | 'done'; //статусы анимации очередь -> проигрывание -> завершено

//это заявка на проигрывание анимации для проигрывателя FSM
export type EffectItem = FXMeta & FXRequest;

export type FXMeta = {
    id: string,
    status: FXStatus,
    createdAt: number,
};


//TODO: Вынести в файл для интерфейсов
export interface FXPlayer {
    attach(mesh: THREE.Mesh): void,
    update(dt: number): boolean,
}
