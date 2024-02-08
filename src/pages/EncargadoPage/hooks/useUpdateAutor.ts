import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { AutorUpdate } from "../../AutoresPage/models";
import { updateAutor } from "../useCases";

export const useUpdateAutor = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, AutorUpdate>({
    mutationFn: (autor) => updateAutor(autor),
    onMutate: () => {
      toast.show({
        severity: "info",
        summary: "Actualizando autor",
        detail: "Por favor espere...",
      });
    },
    onError: (error) => {
      toast.show({
        severity: "error",
        summary: "Error al actualizar autor",
        detail: error.message,
      });
    },
    onSuccess: () => {
      toast.show({
        severity: "success",
        summary: "Autor actualizado",
        detail: "El autor ha sido actualizado exitosamente",
      });
    },
  });
};
