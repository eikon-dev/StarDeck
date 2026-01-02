import {create} from "zustand";

type FXType = 'star' | 'shake';
type FXStatus = 'queued' | 'playing' | 'done';

type EffectItem = {
    id: string,
    type: FXType,
    status: FXStatus,
    createdAt: number,
}


interface FXStore {
    queue: EffectItem[],

    createEffectItem: (id: number) => void,
}

const useFXStore = create<FXStore>((set) => ({
    queue: [],

    createEffectItem: (id) => {

    }
}));

export default useFXStore;