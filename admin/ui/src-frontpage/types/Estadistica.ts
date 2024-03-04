import { EstadisticaDatos } from "../../src/types/EstadisticaDatos";
import { Grafico } from "../../src/types/Grafico";
import { FichaDibulgacion } from "./FichaDibulgacion";

export interface Estadistica {
  id?: number;
  fichaDivulgacion?: FichaDibulgacion;
  graficos?: Grafico[];
  datos: EstadisticaDatos;
}
