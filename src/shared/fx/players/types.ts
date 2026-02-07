//TODO:COMPLETE Вынести в файл для интерфейсов
import * as THREE from "three";

export interface FXPlayer {
  attach(mesh: THREE.Mesh): void,

  update(dt: number): boolean,
}