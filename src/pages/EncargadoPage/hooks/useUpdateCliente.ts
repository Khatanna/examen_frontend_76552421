import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { ClienteUpdate } from "../../ClientePage/models";
import { updateCliente } from "../useCases";

export const useUpdateCliente = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, ClienteUpdate>({
    mutationFn: (cliente) => updateCliente(cliente),
    onMutate() {
      toast.show({
        severity: "info",
        summary: "Actualizando cliente",
        detail: "Por favor espere...",
      });
    },
    onError: (error) => {
      toast.show({
        severity: "error",
        summary: "Error al actualizar el cliente",
        detail: error.message,
      });
    },
    onSuccess: () => {
      toast.show({
        severity: "success",
        summary: "Cliente actualizado",
        detail: "El cliente ha sido actualizado exitosamente",
      });
    },
  });
};
