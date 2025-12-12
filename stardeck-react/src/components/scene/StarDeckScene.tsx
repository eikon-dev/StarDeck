import BottomPanel from "@/components/tasks/BottomPanel.tsx";
import Header from "./Header.tsx";
import {Canvas} from "@react-three/fiber";
import {StarShader} from "@/three/StarShader.tsx";
// import StarField from "@/three/StarField.tsx";

export default function StarDeckScene() {
    return (
        <div>
            <div className="fixed inset-0">
                <Canvas>
                    {/*<StarField/>*/}
                    <StarShader
                        size={10.8}
                        color="#38bdf8"
                        intensity={1}
                        radius={0.2}
                        softness={0.1}
                    />
                </Canvas>
            </div>
            <div className="relative min-h-screen overflow-hidden text-white">
                <Header/>
                <BottomPanel/>
            </div>
        </div>
    );
}

