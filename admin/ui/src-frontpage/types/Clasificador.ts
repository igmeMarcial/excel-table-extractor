export interface Clasificador {
  id?: number;
  padreId?: number;
  numero?: string;
  nombre?: string;
  hijos?: Clasificador[];
}
