// src/components/StarShader.tsx

import {useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {fragmentShader, vertexShader} from "@/three/shaders/testedShader.ts";
import {Mesh} from "three";

export default function StarShader() {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const materialMesh = useRef<THREE.Mesh | null>(null);

    type Phases = 'idle' | 'enter' | 'hold' | 'exit';

    interface CTX {
        phase: Phases,
        t: number,
        posY: number,
        speed: number,
    }

    const ctx = useRef<CTX>({
        phase: 'idle',
        t: 0,
        posY: -5,
        speed: 10,
    })

    function stepIdle(mesh: Mesh, ctx: CTX) {
        if (ctx.phase !== 'idle') return;

        ctx.t = 0;
        ctx.posY = -5;
        mesh.position.setY(ctx.posY);
        ctx.phase = 'enter';

    }

    function stepEnter(mesh: Mesh, ctx: CTX, dt: number) {
        if (ctx.phase !== 'enter') return;
        ctx.t += dt;
        ctx.posY += ctx.speed * dt;
        mesh.position.y = ctx.posY;

        if (ctx.t >= 0.5) {
            ctx.phase = 'hold';
        }
    }

    function stepHold(ctx: CTX, dt: number) {
        if (ctx.phase !== 'hold') return;
        ctx.t += dt;
        if (ctx.t >= 1.5) {
            ctx.phase = 'exit';
        }
    }

    function stepExit(mesh: Mesh, ctx: CTX, dt: number) {
        if (ctx.phase !== 'exit') return;
        ctx.t += dt;
        ctx.posY += ctx.speed * dt;
        mesh.position.y = ctx.posY;

        if (ctx.t >= 2.5) {
            ctx.phase = 'idle';
        }
    }

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

        stepIdle(matMesh, ctx.current);
        stepEnter(matMesh, ctx.current, delta);
        stepHold(ctx.current, delta);
        stepExit(matMesh, ctx.current, delta);

    });


    const uniforms = useMemo(() => ({
        uTime: {value: 0},
        uResolution: {value: new THREE.Vector2(1, 1)},
        uAspect: {value: 1},
    }), [])

    return (
        <mesh
            ref={materialMesh}
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
}


// const PHASE: Record<Phases> = {
//     init: Phases,
//     enter: 'enter',
//     hold: 'hold',
//     exit: 'exit',
// }

// const currentPhase = useRef(PHASE.init);
// const animParameters = useRef({
//     speed: 10,
//     startPos: -5,
// });
// function animationMesh(mesh: Mesh, delta: number) {
//     if (currentPhase.current === 'init') {
//         const starPos = animParameters.current.startPos;
//         mesh.position.setY(starPos);
//         currentPhase.current = 'enter';
//     }
//     if (currentPhase.current === 'enter') {
//         const speed = animParameters.current.speed;
//         mesh.position.y += speed * delta;
//         if (mesh.position.y >= 0) {
//             currentPhase.current = 'hold';
//         }
//     }
// }
