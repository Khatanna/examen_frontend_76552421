import { TimeStamp } from "../../model";
import { Libro } from "../LibrosPage/models";

export interface Autor {
  id: number;
  name: string;
}
export interface AutorBase extends TimeStamp {}

export interface AutorConLibros extends Autor {
  libros: Libro[];
}

export interface AutorForm {
  name: string;
}

export interface AutorUpdate extends AutorForm {
  id: number;
}
