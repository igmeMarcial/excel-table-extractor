export interface Clasificador {
  id?: number;
  padreId?: number;
  numeracion?: string;
  nombre?: string;
  hijos?: Clasificador[];
}
