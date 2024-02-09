import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks";
import { AxiosError, AxiosResponse } from "axios";
import { PrestamoForm } from "../../PrestamosPage/models";
import { createPrestamo } from "../useCases/create-prestamo";
import { formatDateForMySQL } from "../../../utilities";

export const useCreatePrestamo = () => {
  const toast = useToast();
  return useMutation<AxiosResponse, AxiosError, PrestamoForm>({
    mutationFn: (prestamo) => {
      return createPrestamo({
        libro_id: prestamo.libro.id,
        cliente_id: prestamo.cliente.id,
        dias_prestamo: +prestamo.dias_prestamo,
        fecha_prestamo: formatDateForMySQL(prestamo.fecha_prestamo),
        estado: "En Prestamo",
      });
    },
    onMutate: () => {
      toast.show({
        severity: "info",
        summary: "Creando prestamo",
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
        detail: "Prestamo creado con éxito",
      });
    },
  });
};
