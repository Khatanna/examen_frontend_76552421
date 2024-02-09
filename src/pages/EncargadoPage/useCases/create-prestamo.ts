import { axios } from "../../../config/axios";
import { PrestamoInput } from "../../PrestamosPage/models";

export const createPrestamo = (prestamo: PrestamoInput) =>
  axios.post("/prestamos", prestamo);
