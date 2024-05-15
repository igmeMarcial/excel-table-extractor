import { Cell } from '../../src/types/Cell';
import { EstadisticaDatos } from '../../src/types/EstadisticaDatos';
import { EstadisticaMarcoOrdenador } from '../../src/types/EstadisticaMarcoOrdenador';
import { FormatoTabla } from '../../src/types/FormatoTabla';
import { Grafico } from '../../src/types/Grafico';
import { FichaDibulgacion } from './FichaDibulgacion';

export interface Estadistica {
  id: number
  nombre: string
  finalidad: string
  descripcion: string
  unidadMedida: string
  formulaCalculo: string
  metodologiaCalculo: string
  fuente: string
  unidadOrganicaGeneradora: string
  ambitoGeografico: string
  limitaciones: string
  marcoOrdenador: EstadisticaMarcoOrdenador
  fichaDivulgacion?: FichaDibulgacion
  graficos?: Grafico[]
  datos: Cell[][]
  periodoSerieTiempo: string;
  presentacionTablaTitulo: string;
  presentacionTablaSubtitulo: string;
  presentacionTablaFuente: string;
  presentacionTablaNota: string;
  presentacionTablaElaboracion: string;
  presentacionTablaFormato: FormatoTabla
}
