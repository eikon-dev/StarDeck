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

    //TODO: Работа с анимацией posX, posY, возможное расширение payload, сейчас posX игнорируется

    attach(mesh: Mesh) {
        if(!mesh) return;

        this.mesh = mesh;
    }

    update(dt: number) {
        const mesh = this.mesh;
        if(!mesh) return false;
        if(this.finished) return true;

        this.stepIdle(mesh);
        this.stepEnter(dt, mesh);
        this.stepHold(dt);
        this.stepExit(dt, mesh);

        return this.finished;
    }

    //TODO: таймер исправить
    //TODO: проверку mesh исправить

    private stepIdle(mesh: Mesh) {
        if(this.ctx.phase !== 'idle') return;

        this.ctx.t = 0;

        mesh.position.y = this.ctx.posY;
        this.ctx.phase = 'enter';
    }

    private stepEnter(dt: number, mesh: Mesh) {
        if (this.ctx.phase !== 'enter') return;

        this.ctx.t += dt;

        this.ctx.posY += this.ctx.speed * dt;
        mesh.position.y = this.ctx.posY;

        if (this.ctx.t >= 0.5) {
            this.ctx.phase = 'hold';
            this.ctx.t = 0;
        }
    }

    private stepHold(dt: number) {
        if (this.ctx.phase !== 'hold') return;
        this.ctx.t += dt;

        if (this.ctx.t >= 1) {
            this.ctx.phase = 'exit';
            this.ctx.t = 0;
        }
    }

    private stepExit(dt: number, mesh: Mesh) {
        if (this.ctx.phase !== 'exit') return;

        this.ctx.t += dt;

        this.ctx.posY += this.ctx.speed * dt;
        mesh.position.y = this.ctx.posY;

        if (this.ctx.t >= 1) {
            this.finished = true;
        }
    }
}