import { EstadisticaDatos } from '../../src/types/EstadisticaDatos';
import { EstadisticaMarcoOrdenador } from '../../src/types/EstadisticaMarcoOrdenador';
import { Grafico } from '../../src/types/Grafico';
import { FichaDibulgacion } from './FichaDibulgacion';

export interface Estadistica {
  id?: number
  marcoOrdenador: EstadisticaMarcoOrdenador
  fichaDivulgacion?: FichaDibulgacion
  graficos?: Grafico[]
  datos: EstadisticaDatos
}
