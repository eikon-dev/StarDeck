// src/components/StarShader.tsx

import {useMemo, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {fragmentShader, vertexShader} from "@/three/shaders/testedShader.ts";

export function StarShader() {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const materialMesh = useRef<THREE.Mesh | null>(null);

    // Обновляем время каждый кадр
    useFrame((state) => {
        const mat = materialRef.current;
        const matMesh = materialMesh.current;
        if (!mat) return;
        if (!matMesh) return;

        const dpr = state.gl.getPixelRatio();

        mat.uniforms.uTime.value = state.clock.elapsedTime;

        // ВАЖНО: drawingBuffer pixels
        mat.uniforms.uResolution.value.set(
            state.size.width * dpr,
            state.size.height * dpr
        );

        // ВАЖНО: aspect в пикселях, а не viewport
        mat.uniforms.uAspect.value = state.size.width / state.size.height;


        matMesh.position.setY(2);

    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0},
        uResolution: { value: new THREE.Vector2(1, 1) },
        uAspect: {value: 1 },
    }), [])

    return (
        <mesh ref={materialMesh}>
            {/* Плоскость, на которую вешаем шейдер */}
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}
