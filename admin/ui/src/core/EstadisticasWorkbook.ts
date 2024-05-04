import * as XLSX from 'xlsx'
import { FICHA_TECNICA_NRO_CAMPO_RANGO_DATOS } from '../config/constantes'
import GraficoHelper from '../helpers/GraficoHelper'
import TablaDatosHelper from '../helpers/TablaDatosHelper'
import { FICHA_FIELDS_MAP } from '../pages/estadisticas/editor/FichaFieldsMap'
import { Cell, CellPosition, CELL_POSITION_BODY, CELL_POSITION_HEADER, CELL_VALUE_TYPE_STRING } from '../types/Cell'
import { CellRange } from '../types/CellRange'
import { Estadistica, FichaTecnicaFields } from '../types/Estadistica'
import { HtmlCellsMatrix } from '../types/HtmlCellMatrix'
import { WorkbookEstadisticaItem } from '../types/WorkbookEstadisticaItem'
import { decodeCellRange } from '../utils/decodeCellRange'
import { calculateSimilarity, toSnakeCase } from '../utils/string-utils'
import { getSheetHtmlRows } from '../utils/xmls-utils'
import { IndiceClasificadores } from './IndiceClasificadores'

const FICHA_SHEET_NAME_REGEX = /^FT(\d{1,4})$/
const DATOS_SHEET_NAME_REGEX = /^C(\d{1,4})$/
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

  getSheet(sheetName: string): XLSX.WorkSheet {
    return this.workbook.Sheets[sheetName]
  }
  getSheetDataMap(
    sheetName: string
  ): HtmlCellsMatrix {
    const sheet: XLSX.WorkSheet = this.workbook.Sheets[sheetName];
    const rows = getSheetHtmlRows(sheet);
    return this.createCellsDataMap(rows);
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
        item.rangoDatos = this.getCampoFichaTecnicaPorNumero(sheetName, FICHA_TECNICA_NRO_CAMPO_RANGO_DATOS)
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

  getNombreEstadistica(
    sheetName: string
  ): string {
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
    const columnaNumerosIndex = this.getInicioFichaTecnicaColumnIndex(sheetName)
    if (columnaNumerosIndex === -1) {
      return out
    }
    // Rango de la hoja de excel
    const range = XLSX.utils.decode_range(sheet['!ref'])
    for (let i = range.s.r; i <= range.e.r; i++) {
      const cellRefAddress = XLSX.utils.encode_cell({ c: columnaNumerosIndex, r: i })
      const cell = sheet[cellRefAddress]
      const cellValue = (cell?.v || '').toString().trim()
      if (cellValue === numeroCampo.toString()) {
        const valueAddress = XLSX.utils.encode_cell({ c: columnaNumerosIndex + 2, r: i })
        const valueCell = sheet[valueAddress]
        return String(valueCell?.v).trim()
      }
    }
    return out
  }
  getInicioFichaTecnicaColumnIndex(sheetName: string): number {
    const sheet = this.getSheet(sheetName)
    const range = XLSX.utils.decode_range(sheet['!ref'])
    for (let j = range.s.c; j <= range.e.c; j++) {
      const cellref = XLSX.utils.encode_cell({ c: j, r: range.s.r })
      const cell = sheet[cellref]
      const cellValue = (cell?.v || '').toString().trim()
      if (cellValue === '1') {
        return j
      }
    }
    return -1
  }
  // Retorna los campos de la ficha técnica de una hoja de excel
  getCamposFichaTecnica(
    sheetName: string,
    clasificadores: IndiceClasificadores
  ): FichaTecnicaFields {
    const sheet = this.getSheet(sheetName);
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    const matrix = this.getCellsMatrix(cellMap, sheet);
    const fields: Estadistica = this.filterValueFichaTecnica(matrix);
    // MDEA Clasificadores path
    const mdeaPathInput = fields.clasificacionMdea || '';
    const pathRe = /\d+\.\d+\.\d+\s*-\s*\d+/;
    if (pathRe.test(mdeaPathInput)) {
      const mdeaFullPath = pathRe.exec(mdeaPathInput)[0];
      const mdeaPath = mdeaFullPath.split('-')[0].trim();
      const numerals = mdeaPath.split('.');
      fields.clasificadorN1Id = clasificadores.getItemIdByNumeral(
        numerals[0]
      );
      fields.clasificadorN2Id = clasificadores.getItemIdByNumeral(
        `${numerals[0]}.${numerals[1]}`
      );
      fields.clasificadorN3Id = clasificadores.getItemIdByNumeral(
        `${numerals[0]}.${numerals[1]}.${numerals[2]}`
      );
    }
    return fields;
  }
  getEstadistica(workbookItem: WorkbookEstadisticaItem, indiceClasificadores: IndiceClasificadores): Estadistica {
    const out: Estadistica = {
      ... this.getCamposFichaTecnica(workbookItem.hojaFicha, indiceClasificadores),
      ... this.getCamposTablaDatos(workbookItem.hojaDatos),
    }
    const sheetDataMap = this.getSheetDataMap(workbookItem.hojaDatos)
    const rangoDatos = decodeCellRange(workbookItem.rangoDatos)
    const htmlCellsMatrix = this.getHtmlCellsRange(sheetDataMap, rangoDatos)
    out.datos = this.getCellsMatrix(htmlCellsMatrix, this.getSheet(workbookItem.hojaDatos))
    out.datosInformacion = TablaDatosHelper.getInformacion(out.datos || [])
    out.graficos = [GraficoHelper.getGraficoDefecto(out)]
    return out
  }
  // Retorna los campos de la tabla de datos de una hoja de excel
  getCamposTablaDatos(sheetName: string): Estadistica {
    const sheet = this.getSheet(sheetName);
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    const matrix = this.getCellsMatrix(cellMap, sheet);
    const data: Estadistica = {
      presentacionTablaFuente: this.getFieldData('Fuente:', matrix),
      presentacionTablaNota: this.getFieldData('Nota:', matrix),
      presentacionTablaElaboracion: this.getFieldData('Elaboración:', matrix),
      presentacionTablaTitulo: this.getTituloTablaDatos(sheetName),
    };
    return data;
  }
  // Se considera como título el primer texto identificado en la hoja de excel
  getTituloTablaDatos(
    sheetName: string
  ): string {
    let out = ''
    const sheet = this.getSheet(sheetName)
    const range = XLSX.utils.decode_range(sheet['!ref'])
    for (let i = range.s.r; i <= range.e.r; i++) {
      for (let j = range.s.c; j <= range.e.c; j++) {
        const cellAddress = XLSX.utils.encode_cell({ c: j, r: i })
        const cell: XLSX.CellObject = sheet[cellAddress]
        if (!cell) return;
        if (cell.t === 's' && cell.v) {
          return cell.v.toString().trim();
        }
      }
    }
    return out
  }
  // Retorna los datos de la tabla de datos de una hoja de excel
  getTablaDatos(sheetName: string): Cell[][] {
    const sheet = this.getSheet(sheetName);
    const out: Cell[][] = [];
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    let htmlTablaDatos = this.getHtmlTablaDatos(cellMap);
    htmlTablaDatos.forEach((row, rowIndex) => {
      let colIndex = 0;
      const rowData: Cell[] = [];
      const cellPostion = this.getRowPosition(row, rowIndex);
      row.forEach((td) => {
        const colSpan = +td.getAttribute('colspan') || 1;
        const rowSpan = +td.getAttribute('rowspan') || 1;
        let value: string | number = td.getAttribute('data-v') || '';
        const type = (td.getAttribute('data-t') as 'n' | 's') || 's';
        const textoFormateado = td.getAttribute('data-w') || '';
        // Parse value to number if type is number
        if (type === 'n') {
          value = +value;
        }
        const dataCell: Cell = {
          v: value,
          r: rowIndex,
          c: colIndex,
          p: cellPostion,
          t: type,
          w: textoFormateado,
        };
        // Añade colspan y rowspan si son mayores a 1
        if (colSpan > 1) {
          dataCell.s = colSpan;
        }
        if (rowSpan > 1) {
          dataCell.rs = rowSpan;
        }
        rowData.push(dataCell);
        colIndex += colSpan;
      });
      out.push(rowData);
    });
    return out;
  }

  getHtmlTablaDatos(rows: HtmlCellsMatrix): HtmlCellsMatrix {
    const rango = this.getRangoTablaDatos(rows);
    return this.getHtmlCellsRange(rows, rango);
  }
  getHtmlCellsRange(rows: HtmlCellsMatrix, range: CellRange): HtmlCellsMatrix {
    let out = [];
    const { start, end } = range;
    for (let i = start.rowIndex; i <= end.rowIndex; i++) {
      const outRow = [];
      for (let j = start.colIndex; j <= end.colIndex; j++) {
        const cell = rows[i][j];
        if (cell) {
          const { rowIndex, colIndex } = this.getCellCoordinates(cell);
          if (i === rowIndex && j === colIndex) {
            outRow.push(cell);
          }
        }
      }
      out.push(outRow);
    }
    return out;
  }
  getRangoTablaDatos(rows: HtmlCellsMatrix): CellRange {
    //!TODO MEJORAR EL ALGORITMO DE RANGO
    const maxDataColums = this.getMaxDataColums(rows);
    const maxColIndex = rows[0].length - 1;
    let startRowIndex = -1;
    let endRowIndex = -1;
    // Iterar filas para determinar la fila de inicio y fin
    rows.forEach((tr, i) => {
      const notEmpty = tr.filter((td) => this.isNotEmptyCell(td));
      const totalNotEmptyCells = notEmpty.length;
      const totalUniqueCells = new Set(notEmpty).size;

      // Verificar si el número de columnas es igual al número máximo de columnas con datos
      // y si el índice de la fila de inicio aún no se ha establecido
      // y si el número de celdas con datos es mayor que 1
      // entonces establecer el índice de la fila de inicio
      if (
        totalNotEmptyCells === maxDataColums &&
        startRowIndex === -1 &&
        totalUniqueCells > 1
      ) {
        startRowIndex = i;
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
        endRowIndex = i;
      }
    });
    // Iterar columnas para determinar la columna de inicio y fin
    let startColIndex = -1;
    let endColIndex = -1;

    for (let colIndex = 0; colIndex < maxColIndex; colIndex++) {
      let totalNotEmptyCell = 0;
      const uniqueCells = new Set();
      for (let rowIndex = startRowIndex; rowIndex <= endRowIndex; rowIndex++) {
        const cell = rows[rowIndex][colIndex];
        uniqueCells.add(cell);
        if (this.isNotEmptyCell(cell)) {
          totalNotEmptyCell++;
        }
      }
      // Se considera como columna de inicio la primera columna que tenga datos en todas las filas
      if (
        totalNotEmptyCell === endRowIndex - startRowIndex + 1 &&
        startColIndex === -1 &&
        uniqueCells.size > 1
      ) {
        startColIndex = colIndex;
      }
      // Se considera como columna de fin la última columna que tenga datos en todas las filas
      if (
        totalNotEmptyCell === endRowIndex - startRowIndex + 1 &&
        startColIndex !== -1 &&
        uniqueCells.size > 1
      ) {
        endColIndex = colIndex;
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
    };
  }
  getMaxDataColums(rows: HtmlCellsMatrix): number {
    let maxDataColums = 0;
    rows.forEach((tr) => {
      const tdWithValues = tr.filter((td) => this.isNotEmptyCell(td));
      if (tdWithValues.length > maxDataColums) {
        maxDataColums = tdWithValues.length;
      }
    });
    return maxDataColums;
  }
  isEmptyCell(cell: HTMLTableCellElement): boolean {
    if (!cell) {
      return true;
    }
    return !cell.getAttribute('data-v');
  }
  isNotEmptyCell(cell: HTMLTableCellElement): boolean {
    return !this.isEmptyCell(cell);
  }
  getFieldData(fieldKeyword, matrix: Cell[][]): string {
    const cellRef = this.getMatchedFieldCell(matrix, fieldKeyword);
    if (!cellRef) {
      return '';
    }
    const out = [];
    const cellRefValue = cellRef.v.toString();
    const cellRefColIndex = cellRef.c;
    const cellRefRowIndex = cellRef.r;
    // Extraer la campo de la misma celda
    let value = cellRefValue.replace(fieldKeyword, '').trim();
    if (value) {
      out.push(value);
    }
    // Exraer campo de la siguiente celda
    const nextCell = matrix[cellRefRowIndex][cellRefColIndex + 1];
    value = nextCell?.v.toString().trim();
    if (value) {
      out.push(value);
    }
    // Extraer campo de la siguientes celdas
    for (let rowIndex = cellRefRowIndex + 1; rowIndex < matrix.length; rowIndex++) {
      const cell = matrix[rowIndex][cellRefColIndex];
      const cellValue = cell.v.toString().trim();
      // La celda contiene un valor y no hace match con otro campo
      if (cellValue && !this.isFieldKeywordCell(cell)) {
        out.push(cellValue);
      } else {
        break;
      }
    }
    return out.join('\n');
  }
  isFieldKeywordCell(cell: Cell) {
    const cellValue = cell.v.toString().trim();
    const keywords = ['Nota:', 'Fuente:', 'Elaboración:', 'Elaboracion:'];
    for (const keyword of keywords) {
      const re = new RegExp(keyword, 'i');
      if (re.test(cellValue)) {
        return true;
      }
    }
    return false;
  }
  getMatchedFieldCell(matrix: Cell[][], fieldKeyword): Cell {
    const re = new RegExp(fieldKeyword, 'i');
    let matchedCell = null;
    matrix.forEach((row) => {
      row.forEach((cell) => {
        if (re.test(cell.v.toString())) {
          matchedCell = cell;
        }
      });
    });
    return matchedCell;
  }
  filterValueFichaTecnica(out) {
    const resultMap = {};
    out.forEach((row) => {
      row.forEach((cell, index) => {
        const snakeCaseKey = toSnakeCase(cell.v.toString());
        const matchedKey = Object.keys(FICHA_FIELDS_MAP).find((key) => {
          const camelCaseKey = toSnakeCase(key);
          const similarity = calculateSimilarity(
            snakeCaseKey,
            camelCaseKey
          );
          return similarity >= 0.5;
        });
        if (matchedKey) {
          const nextIndex = index + 1;
          if (nextIndex < row.length) {
            const nextCell = row[nextIndex];
            const newValue = nextCell.v;
            const resultMapKey = FICHA_FIELDS_MAP[matchedKey];
            if (!resultMap.hasOwnProperty(resultMapKey)) {
              // Si no existe, inicializarla con el nuevo valor
              resultMap[resultMapKey] = `${newValue}`;
            } else {
              // Si existe, concatenar el nuevo valor al valor existente
              resultMap[resultMapKey] += `\n${newValue}`;
            }
          } else {
            const resultMapKey = FICHA_FIELDS_MAP[matchedKey];
            if (!resultMap.hasOwnProperty(resultMapKey)) {
              resultMap[resultMapKey] = '';
            }
          }
        }
      });
    });
    return resultMap;
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
    const maxColIndex = this.getMaxColIndex(rows);
    const maxRowIndex = this.getMaxRowIndex(rows);
    const cellsDataMap: HtmlCellsMatrix = [];
    // Completar el mapa de celdas con ceros
    for (let i = 0; i <= maxRowIndex; i++) {
      cellsDataMap.push(new Array(maxColIndex + 1).fill(null));
    }
    // Llenar el mapa de celdas con unos si la celda tiene datos o pertnece a una celda combinada
    rows.forEach((tr) => {
      // Obtener solo las celdas con valores
      const tds = tr.querySelectorAll('td');
      tds.forEach((td) => {
        const colSpan = +td.getAttribute('colspan') || 1;
        const rowSpan = +td.getAttribute('rowspan') || 1;
        const cellAddress = td.getAttribute('id').replace('sjs-', '');
        const { rowIndex, colIndex } =
          this.cellAddressToCoordinates(cellAddress);
        this.setDataMapValues(
          cellsDataMap,
          td,
          rowIndex,
          colIndex,
          rowSpan,
          colSpan
        );
      });
    });
    return cellsDataMap;
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
        map[i][j] = value;
      }
    }
  }
  getCellsMatrix(rows: HtmlCellsMatrix, sheet: XLSX.WorkSheet): Cell[][] {
    const out: Cell[][] = [];
    rows.forEach((row, rowIndex) => {
      let colIndex = 0;
      const rowData: Cell[] = [];
      const cellPostion = this.getRowPosition(row, rowIndex);
      row.forEach((td) => {
        const colSpan = +td?.getAttribute('colspan') || 1;
        const rowSpan = +td?.getAttribute('rowspan') || 1;
        let value: string | number = '';
        const type = (td?.getAttribute('data-t') as 'n' | 's') || 's';
        let formatoNumero = '';
        let textoFormateado = '';
        if (td) {
          const cellAddress = td.getAttribute('id').replace('sjs-', '');
          const cell = sheet[cellAddress];
          formatoNumero = cell?.z || '';
          textoFormateado = cell?.w || '';
          value = cell?.v || '';
        }
        // Parse value to number if type is number
        if (type === 'n') {
          value = +value;
        }
        const dataCell: Cell = {
          v: value,
          r: rowIndex,
          c: colIndex,
          p: cellPostion,
          t: type,
        };
        if (textoFormateado) {
          dataCell.w = textoFormateado
        }
        if (formatoNumero) {
          dataCell.z = formatoNumero
        }
        // Añade colspan y rowspan si son mayores a 1
        if (colSpan > 1) {
          dataCell.s = colSpan;
        }
        if (rowSpan > 1) {
          dataCell.rs = rowSpan;
        }
        rowData.push(dataCell);
        colIndex += colSpan;
      });
      out.push(rowData);
    });
    return out;
  }
  getRowPosition(row: HTMLTableCellElement[], rowIndex): CellPosition {
    // Header row
    if (this.isHeaderRow(row, rowIndex)) {
      return CELL_POSITION_HEADER;
    }
    // Footer row
    if (this.isFooterRow(row, rowIndex)) {
      return CELL_POSITION_BODY;
    }
    // Body row
    return CELL_POSITION_BODY;
  }
  isHeaderRow(row: HTMLTableCellElement[], rowIndex): boolean {
    if (rowIndex === 0) {
      return true;
    }
    return row.every((cell) => {
      return cell?.getAttribute('data-t') === CELL_VALUE_TYPE_STRING;
    });
  }
  // Función para determinar si una fila es el pie de página de la tabla
  // Condiciones:
  // - Una de las celdas de la fila contiene la palabra "total"
  isFooterRow(row: HTMLTableCellElement[], rowIndex): boolean {
    return row.some((cell) => {
      return cell?.textContent?.toLowerCase().includes('total');
    });
  }
  getMaxColIndex(rows: NodeListOf<Element>): number {
    let max = 0;
    rows.forEach((tr) => {
      const tds = tr.querySelectorAll('td');
      const lastTd = tds[tds.length - 1];
      const colSpan = +lastTd.getAttribute('colspan') || 1;
      const cellAddress = lastTd.getAttribute('id').replace('sjs-', '');
      const { colIndex } = this.cellAddressToCoordinates(cellAddress);
      if (colIndex + colSpan - 1 > max) {
        max = colIndex + colSpan - 1;
      }
      if (tds.length > max) {
        max = tds.length;
      }
    });
    return max;
  }
  getMaxRowIndex(rows: NodeListOf<Element>): number {
    const lastRow = rows[rows.length - 1];
    const tds = lastRow.querySelectorAll('td');
    const { rowIndex } = this.getCellCoordinates(tds[0]);
    return rowIndex;
  }
  cellAddressToCoordinates(cellAddress: string): {
    rowIndex: number;
    colIndex: number;
  } {
    const colLetter = cellAddress.match(/[A-Z]+/g)[0];
    const rowNumber = cellAddress.match(/[0-9]+/g)[0];
    const colIndex = XLSX.utils.decode_col(colLetter);
    const rowIndex = +rowNumber - 1;
    return { rowIndex, colIndex };
  }
  getCellCoordinates(cell: HTMLTableCellElement): {
    rowIndex: number;
    colIndex: number;
  } {
    const cellAddress = this.getCellAddress(cell);
    return this.cellAddressToCoordinates(cellAddress);
  }
  getCellAddress(cell: HTMLTableCellElement): string {
    return cell.getAttribute('id').replace('sjs-', '');
  }
}
