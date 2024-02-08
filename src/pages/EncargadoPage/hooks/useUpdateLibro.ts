import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { LibroConAutor } from "../../LibrosPage/models";
import { updateLibro } from "../useCases";

export const useUpdateLibro = () => {
  const toast = useToast();

  return useMutation<AxiosResponse, AxiosError, LibroConAutor>({
    mutationFn: ({ description, autor, id, lote, titulo }) =>
      updateLibro({
        description,
        id,
        lote,
        titulo,
        autor_id: autor.id,
      }),
    onMutate() {
      toast.show({
        severity: "info",
        summary: "Actualizando libro",
      });
    },
    onSuccess() {
      toast.show({
        severity: "success",
        summary: "Libro actualizado",
      });
    },
    onError(error) {
      console.log(error);
      toast.show({
        severity: "error",
        summary: "Error al actualizar el libro",
        detail: error.message,
      });
    },
  });
};
