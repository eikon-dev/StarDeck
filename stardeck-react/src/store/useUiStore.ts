import {create} from "zustand";

interface UiStore {
    isOpenPanel: boolean;
    togglePanel: () => void;
}

const useUiStore = create<UiStore>((set) => ({
    isOpenPanel: false,

    togglePanel: () => {
        set(s => ({
            isOpenPanel: !s.isOpenPanel
        }))
    },
}))

export default useUiStore;