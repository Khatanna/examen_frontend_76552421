import { Cliente } from "../ClientePage/models";
import { Libro } from "../LibrosPage/models";

interface PrestamoBase {
  fecha_prestamo: string;
  dias_prestamo: number;
  estado: string;
}

export interface Prestamo extends PrestamoBase {
  id: number;
  libro: Libro;
  cliente: Cliente;
}

export interface PrestamoForm {
  libro: Libro;
  cliente: Cliente;
  dias_prestamo: string;
  fecha_prestamo: Date;
}

export interface PrestamoInput {
  libro_id: number;
  cliente_id: number;
  dias_prestamo: number;
  fecha_prestamo: string;
  estado: string;
}
