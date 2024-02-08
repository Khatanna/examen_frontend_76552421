import { axios } from "../../../config/axios";
import { LibroInput } from "../../LibrosPage/models";

export const createLibro = (libro: LibroInput) => {
  return axios.post("/libros", libro);
};
