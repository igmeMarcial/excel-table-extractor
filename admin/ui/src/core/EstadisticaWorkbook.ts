import * as XLSX from 'xlsx'
/**
 * Modelo de datos para basado en el formato de Excel para el recojo de datos estadísticos por extadistica,
 * que incluye campos de ficha técnica y datos estadísticos.
 */
export class EstadisticaWorkbook {

  private workbook: XLSX.WorkBook

  constructor(workbook: XLSX.WorkBook) {
    this.workbook = workbook
  }

  // The workbook object
  getWorkbook(): XLSX.WorkBook {
    return this.workbook
  }

  // The sheet names
  getSheetNames(): string[] {
    return this.workbook.SheetNames
  }

}
