import { axios } from "../../../config/axios";
import { AutorForm } from "../../AutoresPage/models";

export const createAutor = (autor: AutorForm) => axios.post("/autores", autor);
