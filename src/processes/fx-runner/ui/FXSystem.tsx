import * as React from "react";
import type { Mesh } from "three"

import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

import {FXRunner} from "@/processes/fx-runner/model/FXRunner";

import type {FXPort} from "@/processes/fx-runner/model/fx.port";
import type {FXScenePort} from "@/processes/fx-runner/model/FXScene.port";

import FXZustandAdapter from "@/processes/fx-runner/adapters/zustand/fx.zustand-adapter";
import fxSceneR3fAdapter from "@/processes/fx-runner/adapters/r3f/fx-scene.r3f-adapter";

type Props = {
    starMeshRef: React.RefObject<Mesh | null>,
};

const FXSystem = ({starMeshRef}: Props) => {

    const runnerRef = useRef<FXRunner | null>(null);

    const fxPort: FXPort = FXZustandAdapter;
    const fxScenePort: FXScenePort = fxSceneR3fAdapter(starMeshRef);

    if (!runnerRef.current) runnerRef.current = new FXRunner(fxPort, fxScenePort);

    useFrame((_, dt) => {
        runnerRef.current?.tick(dt);
    });

    return null;
}

export default FXSystem;