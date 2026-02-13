import {create} from "zustand";

interface UiStore {
  isOpenPanel: boolean;
  isTaskFormOpen: boolean;
  togglePanel: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const useBottomPanelUiStore = create<UiStore>((set) => ({
  isOpenPanel: false,
  isTaskFormOpen: false,

  togglePanel: () => {
    set(s => ({isOpenPanel: !s.isOpenPanel}))
  },

  openModal: () => {
    set({isTaskFormOpen: true})
  },

  closeModal: () => {
    set({isTaskFormOpen: false})
  },
}))

export default useBottomPanelUiStore;