import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "../../../hooks";
import { ClienteForm } from "../../ClientePage/models";
import { createCliente } from "../useCases";
import { useMutation } from "@tanstack/react-query";

export const useCreateCliente = () => {
  const toast = useToast();

  return useMutation<AxiosResponse, AxiosError, ClienteForm>({
    mutationFn: (cliente) => createCliente(cliente),
    onMutate: () => {
      toast.show({
        severity: "info",
        summary: "Creando cliente",
        detail: "Por favor espere...",
      });
    },
    onError: (error) => {
      toast.show({
        severity: "error",
        summary: "Error al crear cliente",
        detail: error.message,
      });
    },
    onSuccess: () => {
      toast.show({
        severity: "success",
        summary: "Cliente creado",
        detail: "El cliente ha sido creado exitosamente",
      });
    },
  });
};
