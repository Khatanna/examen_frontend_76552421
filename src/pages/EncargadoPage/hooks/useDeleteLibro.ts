import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { deleteLibro } from "../useCases";
import { AxiosError, AxiosResponse } from "axios";

export const useDeleteLibro = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id) => deleteLibro(id),
    onMutate() {
      toast.show({
        severity: "info",
        summary: "Eliminando libro",
        detail: "Estamos eliminando el libro",
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
        summary: "Libro eliminado",
        detail: "El libro ha sido eliminado con éxito",
      });
    },
  });
};
