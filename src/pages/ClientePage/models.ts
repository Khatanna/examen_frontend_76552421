import { TimeStamp } from "../../model";

interface ClienteBase {
  name: string;
  email: string;
  celular: string;
}

export interface Cliente extends TimeStamp, ClienteBase {
  id: number;
}

export interface ClienteConPrestamos extends Cliente {
  // prestamos: Prestamo[];
}

export interface ClienteForm extends ClienteBase {}

export interface ClienteUpdate extends ClienteForm {
  id: number;
}
