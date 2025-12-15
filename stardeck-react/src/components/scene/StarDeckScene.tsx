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
                    <StarShader/>
                </Canvas>
            </div>
            <div className="relative min-h-screen overflow-hidden text-white">
                <Header/>
                <BottomPanel/>
            </div>
        </div>
    );
}

