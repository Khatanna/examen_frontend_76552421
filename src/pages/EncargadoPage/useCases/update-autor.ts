import { axios } from "../../../config/axios";
import { AutorUpdate } from "../../AutoresPage/models";

export const updateAutor = (autor: AutorUpdate) =>
  axios.put(`/autores/${autor.id}`, autor);
