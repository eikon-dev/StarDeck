import {create} from "zustand";

interface UiStore {
    isOpenPanel: boolean;
    isTaskFormOpen: boolean;
    togglePanel: () => void;
    toggleTaskForm: () => void;
}

const useUiStore = create<UiStore>((set) => ({
    isOpenPanel: false,
    isTaskFormOpen: false,

    togglePanel: () => {
        set(s => ({
            isOpenPanel: !s.isOpenPanel
        }))
    },

    toggleTaskForm: () => {
        set(s => ({
            isTaskFormOpen: !s.isTaskFormOpen
        }))
    },
}))

export default useUiStore;