import * as XLSX from 'xlsx'
import { FICHA_TECNICA_NRO_CAMPO_RANGO_DATOS } from '../config/constantes'
import GraficoHelper from '../helpers/GraficoHelper'
import TablaDatosHelper from '../helpers/TablaDatosHelper'
import { FICHA_FIELDS_MAP } from '../pages/estadisticas/editor/FichaFieldsMap'
import {
  Cell,
  CellPosition,
  CELL_POSITION_BODY,
  CELL_POSITION_HEADER,
} from '../types/Cell'
import { CellRange } from '../types/CellRange'
import { Estadistica, FichaTecnicaFields } from '../types/Estadistica'
import { HtmlCellsMatrix } from '../types/HtmlCellMatrix'
import { WorkbookEstadisticaItem } from '../types/WorkbookEstadisticaItem'
import { decodeCellRange } from '../utils/decodeCellRange'
import { encodeCellRange } from '../utils/encodeCellRange'
import { esValorEstadisticoValido } from '../utils/estadistica-utils'
import { calculateSimilarity, removeSpaces, toSnakeCase } from '../utils/string-utils'
import { getSheetHtmlRows } from '../utils/xmls-utils'
import { IndiceClasificadores } from './IndiceClasificadores'

const FICHA_SHEET_NAME_REGEX = /^FT(\d{1,4})$/i
const DATOS_SHEET_NAME_REGEX = /^C(\d{1,4})$/i
/**
 * Modelo de datos para basado en el formato de Excel para el recojo de datos estadísticos por extadistica,
 * que incluye campos de ficha técnica y datos estadísticos.
 */
export class EstadisticasWorkbook {
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
    return this.workbook.SheetNames || []
  }

  // Lista de nombres de hojas de fichas técnicas
  getSheetNamesFichas(): string[] {
    return this.filterSheetNames(FICHA_SHEET_NAME_REGEX)
  }

  // Lista de nombres de hojas de datos
  getSheetNamesDatos(): string[] {
    return this.filterSheetNames(DATOS_SHEET_NAME_REGEX)
  }

  getFichaSheetNameFor(sheetNameDatos: string) {
    const matchs = DATOS_SHEET_NAME_REGEX.exec(sheetNameDatos)
    if (matchs) {
      const id = parseInt(matchs[1])
      return this.getFichaSheetName(id)
    }
    return null
  }

  private filterSheetNames(regex: RegExp): string[] {
    const out = []
    this.getSheetNames().forEach((sheetName) => {
      if (regex.test(sheetName)) {
        out.push(sheetName)
      }
    })
    return out
  }

  getSheet(sheetName: string): XLSX.WorkSheet {
    return this.workbook.Sheets[sheetName]
  }
  getSheetDataMap(sheetName: string): HtmlCellsMatrix {
    const sheet = this.getSheet(sheetName)
    const rows = getSheetHtmlRows(sheet)
    return this.createCellsDataMap(rows)
  }
  // Lista de estadísticas
  getListaEstadisticas(): WorkbookEstadisticaItem[] {
    const out = new Map<number, WorkbookEstadisticaItem>()
    this.getSheetNames().forEach((sheetName, index) => {
      const matchs = FICHA_SHEET_NAME_REGEX.exec(sheetName)
      if (matchs) {
        const id = parseInt(matchs[1])
        const item: WorkbookEstadisticaItem = out.get(id) || {
          id,
          nombre: null,
          hojaDatos: null,
          hojaFicha: null,
          rangoDatos: null,
        }
        item.hojaFicha = sheetName
        item.nombre = this.getNombreEstadistica(sheetName)
        item.rangoDatos = this.getCampoFichaTecnicaPorNumero(
          sheetName,
          FICHA_TECNICA_NRO_CAMPO_RANGO_DATOS
        )
        if (!item.rangoDatos) {
          const datosSheetName = this.getHojaDatosSheetName(id)
          // Determinar rango de datos
          const rangoDatos = this.determinarRangoDatos(datosSheetName)
          item.rangoDatos = encodeCellRange(rangoDatos)
          item.confirmarRangoDatos = true
        }
        out.set(id, item)
        return
      }

      const matchs2 = DATOS_SHEET_NAME_REGEX.exec(sheetName)
      if (matchs2) {
        const id = parseInt(matchs2[1])
        const item: WorkbookEstadisticaItem = out.get(id) || {
          id,
          nombre: null,
          hojaDatos: null,
          hojaFicha: null,
          rangoDatos: null,
        }
        item.hojaDatos = sheetName
        out.set(id, item)
      }
    })
    return Array.from(out.values())
  }

  getHojaDatosSheetName(numeroEstadistica: number): string {
    return this.getEstadisticaSheetName(numeroEstadistica, DATOS_SHEET_NAME_REGEX)
  }

  getFichaSheetName(numeroEstadistica: number) {
    return this.getEstadisticaSheetName(numeroEstadistica, FICHA_SHEET_NAME_REGEX)
  }

  private getEstadisticaSheetName(numeroEstadistica: number, regex: RegExp): string {
    const out = this.getSheetNames().find((sheetName) => {
      const matches = regex.exec(sheetName)
      return matches && parseInt(matches[1]) === numeroEstadistica
    })
    return out || null;
  }

  getNombreEstadistica(sheetName: string): string {
    let out = ''
    const sheet = this.getSheet(sheetName)
    const range = XLSX.utils.decode_range(sheet['!ref'])

    //iterando
    for (let i = range.s.r; i <= range.e.r; i++) {
      for (let j = range.s.c; j <= range.e.c; j++) {
        const cellref = XLSX.utils.encode_cell({ c: j, r: i })
        const cell = sheet[cellref]
        const cellValue = (cell?.v || '').toString().trim()
        // El nombre del indicador o estadística ambiental se encuentra en la primera fila con el número de campo 1
        if (cellValue === '1') {
          const cellref2 = XLSX.utils.encode_cell({ c: j + 2, r: i })
          const cell2 = sheet[cellref2]
          return String(cell2?.v).trim()
        }
      }
    }
    return out
  }
  getCampoFichaTecnicaPorNumero(
    sheetName: string,
    numeroCampo: number
  ): string {
    let out = ''
    const sheet = this.getSheet(sheetName)
    const columnaNumerosIndex =
      this.getInicioFichaTecnicaColumnIndex(sheetName)
    if (columnaNumerosIndex === -1) {
      return out
    }
    // Rango de la hoja de excel
    const range = XLSX.utils.decode_range(sheet['!ref'])
    for (let i = range.s.r; i <= range.e.r; i++) {
      const cellRefAddress = XLSX.utils.encode_cell({
        c: columnaNumerosIndex,
        r: i,
      })
      const cell = sheet[cellRefAddress]
      const cellValue = (cell?.v || '').toString().trim()
      if (cellValue === numeroCampo.toString()) {
        const valueAddress = XLSX.utils.encode_cell({
          c: columnaNumerosIndex + 2,
          r: i,
        })
        const valueCell = sheet[valueAddress]
        return String(valueCell?.v).trim()
      }
    }
    return out
  }
  getInicioFichaTecnicaColumnIndex(sheetName: string): number {
    const sheet = this.getSheet(sheetName)
    const range = XLSX.utils.decode_range(sheet['!ref'])
    for (let i = range.s.r; i <= range.e.r; i++) {
      for (let j = range.s.c; j <= range.e.c; j++) {
        const cellref = XLSX.utils.encode_cell({ c: j, r: i })
        const cell = sheet[cellref]
        const cellValue = (cell?.v || '').toString().trim()
        if (cellValue === '1') {
          return j
        }
      }
    }
    return -1
  }
  // Retorna los campos de la ficha técnica de una hoja de excel
  getCamposFichaTecnica(
    sheetName: string,
    clasificadores: IndiceClasificadores
  ): FichaTecnicaFields {
    const fields: Estadistica = this.getSheetFichaFields(sheetName)
    // MDEA Clasificadores path
    const mdeaPathInput = fields.clasificacionMdea || ''
    const pathRe = /\d+\.\d+\.\d+\s*-\s*\d+/
    if (pathRe.test(mdeaPathInput)) {
      const mdeaFullPath = pathRe.exec(mdeaPathInput)[0]
      const mdeaPath = mdeaFullPath.split('-')[0].trim()
      const numerals = mdeaPath.split('.')
      fields.clasificadorN1Id = clasificadores.getItemIdByNumeral(numerals[0])
      fields.clasificadorN2Id = clasificadores.getItemIdByNumeral(
        `${numerals[0]}.${numerals[1]}`
      )
      fields.clasificadorN3Id = clasificadores.getItemIdByNumeral(
        `${numerals[0]}.${numerals[1]}.${numerals[2]}`
      )
    }
    return this.sanitizeFichaTecnicaFields(fields)
  }
  private sanitizeFichaTecnicaFields(fields: Estadistica): Estadistica {
    const out = { ...fields }
    // Nombre de la estadística
    if (out.nombre) {
      out.nombre = out.nombre.trim().replace(/\n/g, ' ')
    }
    // Unidad de medida
    if (out.unidadMedida) {
      // Eliminar saltos de línea y espacios antes del paréntesis de inicio del simbolo de la unidad de medida
      // Formtato: "Unidad de medida(símbolo)"
      out.unidadMedida = out.unidadMedida.trim().replace(/\n/g, ' ').replace(/ \(/, '(')
    }
    // Periodo de serie de tiempo
    if (out.periodoSerieTiempo) {
      // Eliminar espacios en blanco y saltos de línea
      out.periodoSerieTiempo = removeSpaces(out.periodoSerieTiempo)
    }
    // Clasificación MDEA
    if (out.clasificacionMdea) {
      out.clasificacionMdea = removeSpaces(out.clasificacionMdea)
    }
    // Clasificación ODS
    if (out.clasificacionOds) {
      out.clasificacionOds = removeSpaces(out.clasificacionOds)
    }
    // Clasificación OCDE
    if (out.clasificacionOcde) {
      out.clasificacionOcde = removeSpaces(out.clasificacionOcde)
    }
    // Clasificación PNA
    if (out.clasificacionPna) {
      out.clasificacionPna = removeSpaces(out.clasificacionPna)
    }
    return out
  }
  getEstadistica(
    workbookItem: WorkbookEstadisticaItem,
    indiceClasificadores: IndiceClasificadores
  ): Estadistica {
    const out: Estadistica = {
      ...this.getCamposFichaTecnica(
        workbookItem.hojaFicha,
        indiceClasificadores
      ),
      ...this.getCamposTablaDatos(workbookItem.hojaDatos),
    }
    const rangoDatos = decodeCellRange(workbookItem.rangoDatos)
    out.datos = this.getSheetCellsRange(workbookItem.hojaDatos, rangoDatos)
    out.datosInformacion = TablaDatosHelper.getInformacion(out.datos || [])
    out.graficos = [GraficoHelper.getGraficoDefecto(out)]
    return out
  }
  getSheetCellsRange(sheetName: string, range: CellRange): Cell[][] {
    const sheetDataMap = this.getSheetDataMap(sheetName)
    const htmlCellsMatrix = this.getHtmlCellsRange(sheetDataMap, range)
    return this.getCellsMatrix(htmlCellsMatrix, sheetName)
  }

  // Retorna los campos de la tabla de datos de una hoja de excel
  getCamposTablaDatos(sheetName: string): Estadistica {
    const sheet = this.getSheet(sheetName)
    const htmlRows = getSheetHtmlRows(sheet)
    const cellMap = this.createCellsDataMap(htmlRows)
    const matrix = this.getCellsMatrix(cellMap, sheetName)
    const data: Estadistica = {
      presentacionTablaFuente: this.getFieldData('Fuente:', matrix),
      presentacionTablaNota: this.getFieldData('Nota:', matrix),
      presentacionTablaElaboracion: this.getFieldData('Elaboración:', matrix),
      presentacionTablaTitulo: this.getTituloTablaDatos(sheetName),
    }
    return data
  }
  // Se considera como título el primer texto identificado en la hoja de excel
  getTituloTablaDatos(sheetName: string): string {
    let out = ''
    const sheet = this.getSheet(sheetName)
    const range = XLSX.utils.decode_range(sheet['!ref'])
    for (let i = range.s.r; i <= range.e.r; i++) {
      for (let j = range.s.c; j <= range.e.c; j++) {
        const cellAddress = XLSX.utils.encode_cell({ c: j, r: i })
        const cell: XLSX.CellObject = sheet[cellAddress]
        if (!cell) return
        if (cell.t === 's' && cell.v) {
          return cell.v.toString().trim()
        }
      }
    }
    return out
  }
  getHtmlCellsRange(rows: HtmlCellsMatrix, range: CellRange): HtmlCellsMatrix {
    let out = []
    const { start, end } = range
    for (let i = start.rowIndex; i <= end.rowIndex; i++) {
      const outRow = []
      for (let j = start.colIndex; j <= end.colIndex; j++) {
        const cell = rows[i][j]
        if (cell) {
          const { rowIndex, colIndex } = this.getCellCoordinates(cell)
          if (i === rowIndex && j === colIndex) {
            outRow.push(cell)
          }
        }
      }
      out.push(outRow)
    }
    return out
  }
  determinarRangoDatos(sheetName: string): CellRange {
    const rows = this.getSheetDataMap(sheetName)
    //!TODO MEJORAR EL ALGORITMO DE RANGO
    const maxDataColums = this.getMaxDataColums(rows)
    const maxColIndex = rows[0].length - 1
    let startRowIndex = -1
    let endRowIndex = -1
    // Iterar filas para determinar la fila de inicio y fin
    rows.forEach((tr, i) => {
      const notEmpty = tr.filter((td) => this.isNotEmptyCell(td))
      const totalNotEmptyCells = notEmpty.length
      const totalUniqueCells = new Set(notEmpty).size

      // Verificar si el número de columnas es igual al número máximo de columnas con datos
      // y si el índice de la fila de inicio aún no se ha establecido
      // y si el número de celdas con datos es mayor que 1
      // entonces establecer el índice de la fila de inicio
      if (
        totalNotEmptyCells === maxDataColums &&
        startRowIndex === -1 &&
        totalUniqueCells > 1
      ) {
        startRowIndex = i
      }
      // Verificar si el número de columnas es igual al número máximo de columnas con datos
      // y si el índice de la fila de inicio ya se ha establecido
      // y si el número de celdas con datos es mayor que 1
      // entonces establecer el índice de la fila de fin, endRowIndex queda con el último valor que cumpla la condición
      if (
        totalNotEmptyCells === maxDataColums &&
        startRowIndex !== -1 &&
        totalUniqueCells > 1
      ) {
        endRowIndex = i
      }
    })
    // Iterar columnas para determinar la columna de inicio y fin
    let startColIndex = -1
    let endColIndex = -1

    for (let colIndex = 0; colIndex <= maxColIndex; colIndex++) {
      let totalNotEmptyCell = 0
      const uniqueCells = new Set()
      for (let rowIndex = startRowIndex; rowIndex <= endRowIndex; rowIndex++) {
        const cell = rows[rowIndex][colIndex]
        uniqueCells.add(cell)
        if (this.isNotEmptyCell(cell)) {
          totalNotEmptyCell++
        }
      }
      // Se considera como columna de inicio la primera columna que tenga datos en todas las filas
      if (
        totalNotEmptyCell === endRowIndex - startRowIndex + 1 &&
        startColIndex === -1 &&
        uniqueCells.size > 1
      ) {
        startColIndex = colIndex
      }
      // Se considera como columna de fin la última columna que tenga datos en todas las filas
      if (
        totalNotEmptyCell === endRowIndex - startRowIndex + 1 &&
        startColIndex !== -1 &&
        uniqueCells.size > 1
      ) {
        endColIndex = colIndex
      }
    }
    return {
      start: {
        rowIndex: startRowIndex,
        colIndex: startColIndex,
      },
      end: {
        rowIndex: endRowIndex,
        colIndex: endColIndex,
      },
    }
  }
  getMaxDataColums(rows: HtmlCellsMatrix): number {
    let maxDataColums = 0
    rows.forEach((tr) => {
      const tdWithValues = tr.filter((td) => this.isNotEmptyCell(td))
      if (tdWithValues.length > maxDataColums) {
        maxDataColums = tdWithValues.length
      }
    })
    return maxDataColums
  }
  isEmptyCell(cell: HTMLTableCellElement): boolean {
    if (!cell) {
      return true
    }
    return !cell.getAttribute('data-v')
  }
  isNotEmptyCell(cell: HTMLTableCellElement): boolean {
    return !this.isEmptyCell(cell)
  }
  getFieldData(fieldKeyword, matrix: Cell[][]): string {
    const cellRef = this.getMatchedFieldCell(matrix, fieldKeyword)
    if (!cellRef) {
      return ''
    }
    const out = []
    const cellRefValue = cellRef.v.toString()
    const cellRefColIndex = cellRef.c
    const cellRefRowIndex = cellRef.r
    // Extraer la campo de la misma celda
    let value = cellRefValue.replace(fieldKeyword, '').trim()
    if (value) {
      out.push(value)
    }
    // Exraer campo de la siguiente celda
    const nextCell = matrix[cellRefRowIndex][cellRefColIndex + 1]
    value = nextCell?.v.toString().trim()
    if (value) {
      out.push(value)
    }
    // Extraer campo de la siguientes celdas
    for (
      let rowIndex = cellRefRowIndex + 1;
      rowIndex < matrix.length;
      rowIndex++
    ) {
      const cell = matrix[rowIndex][cellRefColIndex]
      const cellValue = cell.v.toString().trim()
      // La celda contiene un valor y no hace match con otro campo
      if (cellValue && !this.isFieldKeywordCell(cell)) {
        out.push(cellValue)
      } else {
        break
      }
    }
    return out.join('\n')
  }
  isFieldKeywordCell(cell: Cell) {
    const cellValue = cell.v.toString().trim()
    const keywords = ['Nota:', 'Fuente:', 'Elaboración:', 'Elaboracion:']
    for (const keyword of keywords) {
      const re = new RegExp(keyword, 'i')
      if (re.test(cellValue)) {
        return true
      }
    }
    return false
  }
  getMatchedFieldCell(matrix: Cell[][], fieldKeyword): Cell {
    const re = new RegExp(fieldKeyword, 'i')
    let matchedCell = null
    matrix.forEach((row) => {
      row.forEach((cell) => {
        if (re.test(cell.v.toString())) {
          matchedCell = cell
        }
      })
    })
    return matchedCell
  }
  private getSheetFichaFields(sheetName: string) {
    const sheet = this.getSheet(sheetName)
    const htmlRows = getSheetHtmlRows(sheet)
    const cellMap = this.createCellsDataMap(htmlRows)
    const rows = this.getCellsMatrix(cellMap, sheetName)

    const inicioFichaColIndex = this.getInicioFichaTecnicaColumnIndex(sheetName);
    if (inicioFichaColIndex === -1) {
      return {};
    }

    const nombreCampoColIndex = inicioFichaColIndex + 1;
    const resultMap = {}
    rows.forEach((row) => {
      const cell = row[nombreCampoColIndex];
      const snakeCaseKey = toSnakeCase((cell.v || '').toString())
      const matchedKey = Object.keys(FICHA_FIELDS_MAP).find((fieldKey) => {
        const similarity = calculateSimilarity(snakeCaseKey, fieldKey)
        return similarity >= 0.9
      })
      if (matchedKey) {
        const nextIndex = nombreCampoColIndex + 1
        if (nextIndex < row.length) {
          const nextCell = row[nextIndex]
          const newValue = nextCell.v
          const resultMapKey = FICHA_FIELDS_MAP[matchedKey]
          if (!resultMap.hasOwnProperty(resultMapKey)) {
            // Si no existe, inicializarla con el nuevo valor
            resultMap[resultMapKey] = `${newValue}`
          } else {
            // Si existe, concatenar el nuevo valor al valor existente
            resultMap[resultMapKey] += `\n${newValue}`
          }
        } else {
          const resultMapKey = FICHA_FIELDS_MAP[matchedKey]
          if (!resultMap.hasOwnProperty(resultMapKey)) {
            resultMap[resultMapKey] = ''
          }
        }
      }
    })
    return resultMap
  }
  /**
   *
   * | 0   | 1   | 2   | 3    | 4    |
   * | 0   | 1   | 2   | 3    | 4    |
   * | 0   | 1   | 5   | 10   | null |
   * | 0   | 1   | 2   | 3    | null |
   *
   * @param rows
   * @returns
   */
  createCellsDataMap(rows: NodeListOf<Element>): HtmlCellsMatrix {
    const maxColIndex = this.getMaxColIndex(rows)
    const maxRowIndex = this.getMaxRowIndex(rows)
    const cellsDataMap: HtmlCellsMatrix = []
    // Completar el mapa de celdas con ceros
    for (let i = 0; i <= maxRowIndex; i++) {
      cellsDataMap.push(new Array(maxColIndex + 1).fill(null))
    }
    // Llenar el mapa de celdas con unos si la celda tiene datos o pertnece a una celda combinada
    rows.forEach((tr) => {
      // Obtener solo las celdas con valores
      const tds = tr.querySelectorAll('td')
      tds.forEach((td) => {
        const colSpan = +td.getAttribute('colspan') || 1
        const rowSpan = +td.getAttribute('rowspan') || 1
        const cellAddress = td.getAttribute('id').replace('sjs-', '')
        const { rowIndex, colIndex } =
          this.cellAddressToCoordinates(cellAddress)
        this.setDataMapValues(
          cellsDataMap,
          td,
          rowIndex,
          colIndex,
          rowSpan,
          colSpan
        )
      })
    })
    return cellsDataMap
  }
  setDataMapValues(
    map: any[][],
    value: any,
    rowIndex: number,
    colIndex: number,
    rows: number = 1,
    cols: number = 1
  ) {
    for (let i = rowIndex; i < rowIndex + rows; i++) {
      for (let j = colIndex; j < colIndex + cols; j++) {
        map[i][j] = value
      }
    }
  }
  getCellsMatrix(rows: HtmlCellsMatrix, sheetName: string): Cell[][] {
    const sheet = this.getSheet(sheetName)
    const out: Cell[][] = []
    rows.forEach((row, rowIndex) => {
      let colIndex = 0
      const rowData: Cell[] = []
      const cellPostion = this.getRowPosition(row, rowIndex)
      row.forEach((td) => {
        const defaultCell: Cell = {
          v: '',
          r: rowIndex,
          c: colIndex,
          p: cellPostion,
          t: 's',
        }
        colIndex++
        if (!td) {
          rowData.push(defaultCell)
          return
        }
        const colSpan = +td.getAttribute('colspan') || 1
        const rowSpan = +td.getAttribute('rowspan') || 1
        const encodedCellAddress = td.getAttribute('id').replace('sjs-', '')
        const cellAddress = XLSX.utils.decode_cell(encodedCellAddress)
        const cell = sheet[encodedCellAddress]
        if (!cell) {
          rowData.push(defaultCell)
          return
        }

        const dataCell: Cell = {
          v: cell.v,
          r: rowIndex,
          c: cellAddress.c,
          p: cellPostion,
          t: cell.t || 's',
        }
        // Formato de texto
        if (cell.w) {
          dataCell.w = cell.w
        }
        // Formato de numero
        if (cell.z) {
          dataCell.z = cell.z
        }
        // Añade colspan y rowspan si son mayores a 1
        if (colSpan > 1) {
          dataCell.s = colSpan
        }
        if (rowSpan > 1) {
          dataCell.rs = rowSpan
        }
        rowData.push(dataCell)
      })
      out.push(rowData)
    })
    return out
  }
  getRowPosition(row: HTMLTableCellElement[], rowIndex): CellPosition {
    // Header row
    if (this.isHeaderRow(row, rowIndex)) {
      return CELL_POSITION_HEADER
    }
    // Footer row
    if (this.isFooterRow(row, rowIndex)) {
      return CELL_POSITION_BODY
    }
    // Body row
    return CELL_POSITION_BODY
  }
  isHeaderRow(row: HTMLTableCellElement[], rowIndex): boolean {
    if (rowIndex === 0) {
      return true
    }
    return row.every((cell) => {
      const val = cell?.textContent?.trim()
      return !esValorEstadisticoValido(val)
    })
  }
  // Función para determinar si una fila es el pie de página de la tabla
  // Condiciones:
  // - Una de las celdas de la fila contiene la palabra "total"
  isFooterRow(row: HTMLTableCellElement[], rowIndex): boolean {
    return row.some((cell) => {
      return cell?.textContent?.toLowerCase().includes('total')
    })
  }
  getMaxColIndex(rows: NodeListOf<Element>): number {
    let max = -1
    rows.forEach((tr) => {
      const tds = tr.querySelectorAll('td')
      const lastTd = tds[tds.length - 1]
      const colSpan = +lastTd.getAttribute('colspan') || 1
      const cellAddress = lastTd.getAttribute('id').replace('sjs-', '')
      const { colIndex } = this.cellAddressToCoordinates(cellAddress)
      if (colIndex + colSpan - 1 > max) {
        max = colIndex + colSpan - 1
      }
    })
    return max
  }
  getMaxRowIndex(rows: NodeListOf<Element>): number {
    const lastRow = rows[rows.length - 1]
    const tds = lastRow.querySelectorAll('td')
    const { rowIndex } = this.getCellCoordinates(tds[0])
    return rowIndex
  }
  cellAddressToCoordinates(cellAddress: string): {
    rowIndex: number
    colIndex: number
  } {
    const cell = XLSX.utils.decode_cell(cellAddress)
    return { rowIndex: cell.r, colIndex: cell.c }
  }
  getCellCoordinates(cell: HTMLTableCellElement): {
    rowIndex: number
    colIndex: number
  } {
    const cellAddress = this.getCellAddress(cell)
    return this.cellAddressToCoordinates(cellAddress)
  }
  getCellAddress(cell: HTMLTableCellElement): string {
    return cell.getAttribute('id').replace('sjs-', '')
  }
}
