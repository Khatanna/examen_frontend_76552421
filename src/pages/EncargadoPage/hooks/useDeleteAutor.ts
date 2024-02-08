import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { deleteAutor } from "../useCases";

export const useDeleteAutor = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id) => deleteAutor(id),
    onMutate() {
      toast.show({
        severity: "info",
        summary: "Eliminando autor",
        detail: "Estamos eliminando el autor",
      });
    },
    onError(error) {
      toast.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    },
    onSuccess() {
      toast.show({
        severity: "success",
        summary: "Autor eliminado",
        detail: "El autor ha sido eliminado con éxito",
      });
    },
  });
};
