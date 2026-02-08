import BottomPanel from "@/widgets/bottom-panel/ui/BottomPanel.tsx";
import Header from "../../shared/ui/Header.tsx";
import {Canvas} from "@react-three/fiber";
import StarShader from "@/shared/three/StarShader.tsx";
import {useRef} from "react";
import * as THREE from "three";
import FXSystem from "@/processes/fx-runner/ui/FXSystem";

export default function StarDeckScene() {
  const starMeshRef = useRef<THREE.Mesh | null>(null);

  return (
    <div>

      <div className="fixed inset-0 z-50 pointer-events-none">
        <Canvas
          className="pointer-events-none"
          style={{pointerEvents: "none", touchAction: "auto"}}
          dpr={[1, 2]}
        >
          <StarShader ref={starMeshRef}/>
          <FXSystem starMeshRef={starMeshRef}/>
        </Canvas>
      </div>

      <div className="relative z-10 min-h-screen overflow-hidden text-white">
        <Header/>
        <BottomPanel/>
      </div>

    </div>
  );
}

