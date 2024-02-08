import { TimeStamp } from "../../model";
import { Autor } from "../AutoresPage/models";

interface LibroBase extends TimeStamp {
  titulo: string;
  description: string;
  lote: string;
}

export interface Libro extends LibroBase {
  id: number;
}

export interface LibroForm extends LibroBase {
  autor: Autor;
}

export interface LibroInput extends LibroBase {
  autor_id: number;
}

export interface LibroConAutor extends Libro {
  autor_id: number;
  autor: Autor;
}
export interface LibroUpdate extends LibroInput {
  id: number;
}
