import { TimeStamp } from "../../model";
import { Libro } from "../LibrosPage/models";

export interface Autor extends TimeStamp {
  id: number;
  name: string;
}

export interface AutorConLibros extends Autor {
  libros: Libro[];
}

export interface AutorForm {
  name: string;
}

export interface AutorUpdate extends AutorForm {
  id: number;
}
