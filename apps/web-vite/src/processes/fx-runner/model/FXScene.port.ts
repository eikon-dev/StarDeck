import {Mesh} from "three";

//TODO: Подумать об обобщении метода
export interface FXScenePort {
  getStarMesh(): Mesh | null,
}