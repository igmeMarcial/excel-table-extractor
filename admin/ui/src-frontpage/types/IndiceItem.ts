export interface IndiceItem {
  id: number;
  estadisticaId?: number;
  clasificadorId?: number;
  numeral: string;
  nombre: string;
  expanded?: boolean;
  visible?: boolean;
  nivel: number;
  hasChildren: boolean;
}
