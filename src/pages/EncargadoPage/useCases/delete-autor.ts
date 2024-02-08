import { axios } from "../../../config/axios";

export const deleteAutor = (id: number) => axios.delete(`/autores/${id}`);
