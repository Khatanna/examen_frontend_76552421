import { useToastStore } from "../state";

export const useToast = () => {
  const toast = useToastStore((state) => state.toast!);
  return toast.current!;
};
