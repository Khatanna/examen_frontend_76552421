import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "../../../hooks";
import { useMutation } from "@tanstack/react-query";
import { deleteCliente } from "../useCases";

export const useDeleteCliente = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id) => deleteCliente(id),
    onMutate: () => {
      toast.show({
        severity: "info",
        summary: "Eliminando cliente",
        detail: "Por favor espere...",
      });
    },
    onError: (error) => {
      toast.show({
        severity: "error",
        summary: "Error al eliminar cliente",
        detail: error.message,
      });
    },
    onSuccess: () => {
      toast.show({
        severity: "success",
        summary: "Cliente eliminado",
        detail: "El cliente ha sido eliminado exitosamente",
      });
    },
  });
};
