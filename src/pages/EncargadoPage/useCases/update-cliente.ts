import { axios } from "../../../config/axios";
import { ClienteUpdate } from "../../ClientePage/models";

export const updateCliente = (cliente: ClienteUpdate) =>
  axios.put(`/clientes/${cliente.id}`, cliente);
