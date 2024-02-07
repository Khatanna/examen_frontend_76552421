export interface Libro {
  id: number;
  titulo: string;
  description: string;
  lote: string;
  updated_at: string;
  created_at: string;
  // autor: Autor;
}

export interface LibroInput {
  titulo: string;
  description: string;
  lote: string;
}
