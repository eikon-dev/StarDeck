import type {EffectItem} from "@/three/fx/fx.type";
import type {FXPort} from "@/three/fx/fx.port";

export class FXRunner {
    private fxPort: FXPort;
    private currentId: string | null = null;

    constructor(fxPort: FXPort) {
        this.fxPort = fxPort;
    }

    tick() {
        if (this.currentId !== null) return;

        const queue: EffectItem[] = this.fxPort.getQueue()
        const effect: EffectItem | undefined = this.pickNext(queue);
        if (!effect) return;

        this.currentId = effect.id;

        this.play(effect)
            .finally(() => {
                this.onFinish(effect.id)
            });
    }

    private pickNext(queue: EffectItem[]): EffectItem | undefined {
        if (queue.length === 0) return;

        return queue.find(item => item.status === 'queued');
    }

    private play(effect: EffectItem): Promise<void> {
        this.fxPort.start(effect.id)

        return Promise.resolve();
    }

    private onFinish(id: string): void {
        this.fxPort.finish(id);

        this.currentId = null;
    }
}