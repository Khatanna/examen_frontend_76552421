import { axios } from "../../../config/axios";

export const deleteLibro = (id: number) => axios.delete(`/libros/${id}`);
