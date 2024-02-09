import { axios } from "../../../config/axios";

export const registerDevolucion = (id: number) =>
  axios.put(`/prestamos/${id}/devolucion`);
