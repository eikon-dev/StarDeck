
import type {StarEffect} from "@/three/fx/fx.type";

type Phases = 'idle' | 'enter' | 'hold' | 'exit';

interface CTX {
    phase: Phases,
    t: number,
    posY: number,
    speed: number,
}


class StarPlayer {
    private ctx: CTX;

    constructor(payload: StarEffect['payload']) {
        this.ctx = {
            phase: "idle",
            t: 0,
            posY: payload.posY,
            speed: 10,
        }
    }


    update(dt: number) {

    }

    private stepIdle() {

    }
    private stepEnter() {

    }
    private stepHold() {

    }
    private stepExit() {

    }

}




// import {useRef} from "react";
// import {Mesh} from "three";
//

//
// interface CTX {
//     phase: Phases,
//     t: number,
//     posY: number,
//     speed: number,
// }
//
// const ctx = useRef<CTX>({
//     phase: 'idle',
//     t: 0,
//     posY: -5,
//     speed: 10,
// })
//
//
// function stepIdle(mesh: Mesh, ctx: CTX) {
//     if (ctx.phase !== 'idle') return;
//     ctx.t = 0;
//     ctx.posY = -5;
//
//     mesh.position.setY(ctx.posY);
//     ctx.phase = 'enter';
// }
//
// function stepEnter(mesh: Mesh, ctx: CTX, dt: number) {
//     if (ctx.phase !== 'enter') return;
//     ctx.t += dt;
//
//     ctx.posY += ctx.speed * dt;
//     mesh.position.y = ctx.posY;
//
//     if (ctx.t >= 0.5) {
//         ctx.phase = 'hold';
//     }
// }
//
// function stepHold(ctx: CTX, dt: number) {
//     if (ctx.phase !== 'hold') return;
//     ctx.t += dt;
//
//     if (ctx.t >= 1.5) {
//         // ctx.phase = 'exit';
//     }
// }
//
// function stepExit(mesh: Mesh, ctx: CTX, dt: number) {
//     if (ctx.phase !== 'exit') return;
//     ctx.t += dt;
//
//     ctx.posY += ctx.speed * dt;
//     mesh.position.y = ctx.posY;
//
//     if (ctx.t >= 2.5) {
//         ctx.phase = 'idle';
//     }
// }