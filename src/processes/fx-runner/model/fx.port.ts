import type {EffectItem} from "@/entities/fx/model/fx.type";

export interface FXPort {
    getQueue: () => EffectItem[];
    start: (id: string) => void;
    finish: (id: string) => void;
}