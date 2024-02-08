import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { AutorForm } from "../../AutoresPage/models";
import { createAutor } from "../useCases";

export const useCreateAutor = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, AutorForm>({
    mutationFn: (autor) => createAutor(autor),
    onMutate: () => {
      toast.show({
        severity: "info",
        summary: "Creando autor",
      });
    },
    onSuccess: () => {
      toast.show({
        severity: "success",
        summary: "Autor creado",
        detail: "El autor se ha creado correctamente",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.show({
        severity: "error",
        summary: "Error al crear el autor",
        detail: error.message,
      });
    },
  });
};
