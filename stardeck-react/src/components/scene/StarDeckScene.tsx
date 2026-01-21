import BottomPanel from "@/components/tasks/BottomPanel.tsx";
import Header from "./Header.tsx";
import {Canvas} from "@react-three/fiber";
import StarShader from "@/three/fx/StarShader.tsx";
import {useRef} from "react";
import * as THREE from "three";
import FXSystem from "@/three/fx/FXSystem";

// import StarField from "@/three/StarField.tsx";

export default function StarDeckScene() {
    const starMeshRef = useRef<THREE.Mesh | null>(null);

    return (
        <div>
            <div className="fixed inset-0 z-50 pointer-events-none">
                <Canvas
                    className="pointer-events-none"
                    style={{ pointerEvents: "none", touchAction: "auto" }}
                    dpr={[1, 2]}
                >
                    {/*<StarField/>*/}
                    <StarShader ref={starMeshRef}/>
                    <FXSystem starMeshRef={starMeshRef} />
                </Canvas>
            </div>
            <div className="relative z-10 min-h-screen overflow-hidden text-white">
                <Header/>
                <BottomPanel/>
            </div>
        </div>
    );
}

