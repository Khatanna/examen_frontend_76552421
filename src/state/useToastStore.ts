import { Toast } from "primereact/toast";
import { create } from "zustand";

interface State {
  toast?: React.RefObject<Toast>;
}

interface Actions {
  setToast: (toast: React.RefObject<Toast>) => void;
  removeToast: () => void;
}

export const useToastStore = create<State & Actions>((set) => ({
  setToast(toast) {
    set({ toast });
  },
  removeToast() {
    set({ toast: undefined });
  },
}));
