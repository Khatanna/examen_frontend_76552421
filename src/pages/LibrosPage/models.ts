import { TimeStamp } from "../../model";
import { Autor } from "../AutoresPage/models";

interface LibroBase {
  titulo: string;
  description: string;
  lote: string;
}

export interface Libro extends TimeStamp {
  id: number;
}

export interface LibroForm extends LibroBase {
  autor: Autor;
}

export interface LibroInput extends LibroBase {
  autor_id: number;
}

export interface LibroConAutor extends LibroBase, TimeStamp, Libro {
  autor_id: number;
  autor: Autor;
}
export interface LibroUpdate extends LibroInput {
  id: number;
}
