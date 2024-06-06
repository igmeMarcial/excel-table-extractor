export interface WorkbookEstadisticaItem {
  id: number;
  nombre: string;
  hojaDatos: string;
  hojaFicha: string;
  rangoDatos: string;
  rangoDatosGrafico?:string;
  confirmarRangoDatos?: boolean

}
