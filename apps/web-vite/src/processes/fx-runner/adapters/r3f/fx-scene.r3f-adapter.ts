import type {FXScenePort} from "@/processes/fx-runner/model/FXScene.port";
import type {Mesh} from "three";
import * as React from "react";

export default function fxSceneR3fAdapter(meshRef: React.RefObject<Mesh | null>): FXScenePort {
  return {
    getStarMesh: () => meshRef.current,
  };
}