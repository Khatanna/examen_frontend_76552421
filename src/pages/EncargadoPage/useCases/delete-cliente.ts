import { axios } from "../../../config/axios";

export const deleteCliente = (id: number) => axios.delete(`/clientes/${id}`);
