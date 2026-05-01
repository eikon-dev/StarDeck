import {create} from "zustand";

interface UiStore {
  isOpenPanel: boolean;
  isTaskFormOpen: boolean;
  isEditTaskFormOpen: boolean;
  togglePanel: () => void;
  openModal: () => void;
  closeModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const useBottomPanelUiStore = create<UiStore>((set) => ({
  isOpenPanel: false,
  isTaskFormOpen: false,
  isEditTaskFormOpen: false,

  togglePanel: () => {
    set(s => ({isOpenPanel: !s.isOpenPanel}))
  },

  openModal: () => {
    set({isTaskFormOpen: true})
  },

  closeModal: () => {
    set({isTaskFormOpen: false})
  },

  openEditModal: () => {
    set({isEditTaskFormOpen: true})
  },

  closeEditModal: () => {
    set({isEditTaskFormOpen: false})
  },
}))

export default useBottomPanelUiStore;