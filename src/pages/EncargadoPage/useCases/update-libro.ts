import { axios } from "../../../config/axios";
import { LibroUpdate } from "../../LibrosPage/models";

export const updateLibro = (libro: LibroUpdate) =>
  axios.put(`/libros/${libro.id}`, libro);
