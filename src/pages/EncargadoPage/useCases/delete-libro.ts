import { axios } from "../../../config/axios";

export const deleteLibro = (id: string) => axios.delete(`/libros/${id}`);
