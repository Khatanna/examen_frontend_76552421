import { axios } from "../../../config/axios";
import { ClienteForm } from "../../ClientePage/models";

export const createCliente = (cliente: ClienteForm) =>
  axios.post("/clientes", cliente);
