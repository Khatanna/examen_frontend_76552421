import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { registerDevolucion } from "../useCases";

export const useRegisterDevolucion = () => {
  const toast = useToast();

  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id) => {
      return registerDevolucion(id);
    },
    onMutate: () => {
      toast.show({
        severity: "info",
        summary: "Registrando devolución",
        detail: "Por favor espere...",
      });
    },
    onError: (error) => {
      toast.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    },
    onSuccess: () => {
      toast.show({
        severity: "success",
        summary: "Éxito",
        detail: "Devolución registrada",
      });
    },
  });
};
