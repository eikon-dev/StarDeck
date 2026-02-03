import type {FXPort} from "@/processes/fx-runner/model/fx.port";
import type {EffectItem} from "@/three/fx/fx.type";
import useFXStore from "@/store/useFXStore";


//Plain Object
const FXZustandAdapter: FXPort = {
    getQueue(): EffectItem[] {
        //Маловероятно, но может пригодиться TypeGuard
        return useFXStore.getState().queue;
    },
    start(id: string){
        useFXStore.getState().start(id);
    },
    finish(id: string) {
        useFXStore.getState().finish(id);
    },
}

export default FXZustandAdapter;