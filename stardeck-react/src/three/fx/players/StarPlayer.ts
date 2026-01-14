
import type {StarEffect} from "@/three/fx/fx.type";
import {Mesh} from "three";

type Phases = 'idle' | 'enter' | 'hold' | 'exit';

interface CTX {
    phase: Phases,
    t: number,
    posY: number,
    speed: number,
}

class StarPlayer {
    private ctx: CTX;
    private mesh?: Mesh;
    private finished: boolean = false;

    constructor(payload: StarEffect['payload']) {
        this.ctx = {
            phase: "idle",
            t: 0,
            posY: payload.posY,
            speed: 10,
        }
    }

    attach(mesh: Mesh) {
        this.mesh = mesh;
    }

    update(dt: number) {
        if(!this.mesh) return false;

        this.stepIdle();
        this.stepEnter(dt);
        this.stepHold(dt);
        this.stepExit(dt);

        return this.finished;
    }
    //TODO: таймер исправить
    //TODO: проверку mesh исправить
    private stepIdle() {
        if(this.ctx.phase !== 'idle') return;

        this.ctx.t = 0;

        this.mesh.position.y = this.ctx.posY;
        this.ctx.phase = 'enter';
    }

    private stepEnter(dt: number) {
        if (this.ctx.phase !== 'enter') return;

        this.ctx.t += dt;

        this.ctx.posY += this.ctx.speed * dt;
        this.mesh.position.y = this.ctx.posY;

        if (this.ctx.t >= 0.5) {
            this.ctx.phase = 'hold';
        }
    }

    private stepHold(dt: number) {
        if (this.ctx.phase !== 'hold') return;
        this.ctx.t += dt;

        if (this.ctx.t >= 1.5) {
            this.ctx.phase = 'exit';
        }
    }

    private stepExit(dt: number) {
        if (this.ctx.phase !== 'exit') return;
        this.ctx.t += dt;

        this.ctx.posY += this.ctx.speed * dt;
        this.mesh.position.y = this.ctx.posY;

        if (this.ctx.t >= 2.5) {
            this.ctx.phase = 'idle';
            this.finished = true;
        }
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