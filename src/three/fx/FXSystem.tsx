import {FXRunner} from "@/three/fx/FXRunner";
import useFXStore from "@/store/useFXStore";
import type {FXPort} from "@/three/fx/fx.port";
import type {FXScenePort} from "@/three/fx/FXScene.port";
import {useMemo, useRef} from "react";
import * as THREE from "three";
import * as React from "react";
import {useFrame} from "@react-three/fiber";

type Props = {
    starMeshRef: React.RefObject<THREE.Mesh | null>,
};

const FXSystem = ({starMeshRef}: Props) => {

    const runnerRef = useRef<FXRunner | null>(null);

    const fxPort: FXPort = useMemo(() => {
        return {
            getQueue() {
                return useFXStore.getState().queue
            },
            start(id) {
                useFXStore.getState().start(id)
            },
            finish(id) {
                useFXStore.getState().finish(id)
            },
        }
    }, []);

    const fxScenePort: FXScenePort = useMemo(() => {
        return {
            getStarMesh: () => starMeshRef.current,
        }
    }, []);

    if (!runnerRef.current) runnerRef.current = new FXRunner(fxPort, fxScenePort);

    useFrame((_, dt) => {
        runnerRef.current?.tick(dt);

    });

    return null;
}

export default FXSystem;