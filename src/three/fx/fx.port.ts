import type {EffectItem} from "@/three/fx/fx.type";

export interface FXPort {
    getQueue: () => EffectItem[];
    start: (id: string) => void;
    finish: (id: string) => void;
}