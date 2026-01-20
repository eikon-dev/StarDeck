// src/components/StarShader.tsx

import {useMemo, useRef, forwardRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {fragmentShader, vertexShader} from "@/three/shaders/testedShader.ts";

type StarShaderProps = {};

const StarShader = forwardRef<THREE.Mesh, StarShaderProps>((_, forwardedRef) => {

    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const localMeshRef = useRef<THREE.Mesh | null>(null);

    const setMeshRef = (node: THREE.Mesh | null) => {
        localMeshRef.current = node;

        if(!forwardedRef) return;

        if (typeof forwardedRef === "function") {
            forwardedRef(node);
        } else {
            forwardedRef.current = node;
        }
    };


    // Обновляем время каждый кадр
    useFrame((state) => {
        const mat = materialRef.current;
        const matMesh = localMeshRef.current;
        if (!mat || !matMesh) return;

        const dpr = state.gl.getPixelRatio();
        mat.uniforms.uTime.value = state.clock.elapsedTime;
        // ВАЖНО: drawingBuffer pixels
        mat.uniforms.uResolution.value.set(
            state.size.width * dpr,
            state.size.height * dpr
        );
        // ВАЖНО: aspect в пикселях, а не viewport
        mat.uniforms.uAspect.value = state.size.width / state.size.height;
    });


    const uniforms = useMemo(() => ({
        uTime: {value: 0},
        uResolution: {value: new THREE.Vector2(1, 1)},
        uAspect: {value: 1},
    }), []);

    return (
        <mesh
            ref={setMeshRef}
            position={[0, -5, 0]}
        >
            {/* Плоскость, на которую вешаем шейдер */}
            <planeGeometry args={[2, 2]}/>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
});

export default StarShader;
