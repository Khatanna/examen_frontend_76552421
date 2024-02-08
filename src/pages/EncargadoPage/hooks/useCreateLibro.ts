import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "../../../hooks";
import { Libro, LibroForm } from "../../LibrosPage/models";
import { createLibro } from "../useCases";

export const useCreateLibro = () => {
  const toast = useToast();
  return useMutation<AxiosResponse<Libro>, AxiosError, LibroForm>({
    mutationFn: ({ autor, description, lote, titulo }) => {
      return createLibro({
        titulo,
        description,
        lote,
        autor_id: autor.id,
      });
    },
    onMutate() {
      toast.show({
        severity: "info",
        summary: "Registrando libro",
        detail: "Estamos registrando el libro",
      });
    },
    onError(error) {
      console.log(error);
      toast.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    },
    onSuccess() {
      toast.show({
        severity: "success",
        summary: "Libro registrado",
        detail: "El libro ha sido registrado con éxito",
      });
    },
  });
};
