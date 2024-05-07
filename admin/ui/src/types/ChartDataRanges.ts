import { CellRange } from './CellRange'
import { Orientation } from './Orientation'

export interface ChartDataRanges {
  categoriesRange: CellRange     // Rango en formato A1
  valuesRange: CellRange         // Rango en formato A1
  seriesRange: CellRange         // Rango en formato A1
  seriesOrientation: Orientation // Orientación de las series
}
