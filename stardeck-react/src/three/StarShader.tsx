// src/components/StarShader.tsx

import {useMemo, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {fragmentShader, vertexShader} from "@/three/shaders/testedShader.ts";
import {Mesh} from "three";

export default function StarShader() {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const materialMesh = useRef<THREE.Mesh | null>(null);
    const animationParameter = useRef({
        posY: -5,
        speed: 10,
    });

    // Обновляем время каждый кадр
    useFrame((state, delta) => {
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

        animationMesh(matMesh, delta);
    });



    function animationMesh(mesh: Mesh, delta: number) {
        if (mesh.position.y >= 0) return;
        mesh.position.y += delta * animationParameter.current.speed;
    }

    const uniforms = useMemo(() => ({
        uTime: { value: 0},
        uResolution: { value: new THREE.Vector2(1, 1) },
        uAspect: {value: 1 },
    }), [])

    return (
        <mesh
            ref={materialMesh}
            position={[0, -5, 0]}
        >
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
