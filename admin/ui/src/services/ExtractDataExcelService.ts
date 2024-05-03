import * as XLSX from 'xlsx';
import {
  ESTADISTICA_DATOS,
  FICHA_FIELDS_MAP,
} from '../pages/estadisticas/editor/FichaFieldsMap';
import {
  CellPosition,
  CELL_POSITION_BODY,
  CELL_POSITION_HEADER,
  CELL_VALUE_TYPE_STRING,
  Cell,
} from '../types/Cell';
import { EstadisticaDatos } from '../types/EstadisticaDatos';
import { CellRange } from '../types/CellRange';
import { getSheetHtmlRows } from '../utils/xmls-utils';
import { readExcelFile } from '../utils/file-utils';
import { FichaTecnicaFields } from '../types/Estadistica';

type HtmlCellsMatrix = HTMLTableCellElement[][];
interface Sheet {
  [key: string]: any; // Tipo genérico para la celda
}

//TODO: Fusionar models
class ExtractDataExcelService {
  private static _instance: ExtractDataExcelService;

  public static getInstance() {
    if (!ExtractDataExcelService._instance) {
      ExtractDataExcelService._instance = new ExtractDataExcelService();
    }
    return ExtractDataExcelService._instance;
  }

  // Returns a workbook object from an Excel file
  getWorksbook(file: File): Promise<XLSX.WorkBook> {
    return readExcelFile(file);
  }

  getExcelSheetNames(file: File): Promise<string[]> {
    return this.getWorksbook(file).then((workbook: XLSX.WorkBook) => {
      const sheetNames: string[] = workbook.SheetNames;
      return sheetNames;
    });
  }
  //
  extractDataFromFile(
    workbook: XLSX.WorkBook,
    sheetIndex: number
  ): EstadisticaDatos {
    try {
      const sheetName: string = workbook.SheetNames[sheetIndex];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const contentCellTitle: any = this.getTablaDatosTitulo(sheet);

      const contentCellTabla: any = this.getCellTabla(sheet);
      const estadisticaDatos: EstadisticaDatos = {
        titulo: contentCellTitle
          ? contentCellTitle.separatedContent ||
          contentCellTitle.description
          : contentCellTabla.titulo,
        fuente: contentCellTabla.fuente,
        nota: contentCellTabla.nota,
        elaboracion: contentCellTabla.elaboracion,
      };
     
      return estadisticaDatos;
    } catch (error) {
      throw error;
    }
  }
  getNameIndicador(
    workbook: XLSX.WorkBook,
    sheetIndex: number
  ): { nombreIndicador: string; rowIndex: number | null } {
    try {
      const sheetName: string = workbook.SheetNames[sheetIndex];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      let data: string | undefined;
      let rowIndex: number | null = null;
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let foundValue = false;

      const validarCadenaFlex = (
        cadena: string,
        cadenasObjetivo: string[]
      ): boolean => {
        const cadenaNormalizada = cadena
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return cadenasObjetivo.some((objetivo) => {
          const objetivoNormalizado = objetivo
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          return cadenaNormalizada.includes(objetivoNormalizado);
        });
      };

      //iterando
      for (let R = range.s.r; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellref = XLSX.utils.encode_cell({ c: C, r: R });
          const cell = sheet[cellref];
          if (cell !== undefined && typeof cell === 'object' && 'v' in cell) {
            const cellValue = String(cell.v);
            if (
              validarCadenaFlex(cellValue, [
                'Nombre del indicador',
                'estadística ambiental',
                'Nombre del indicador o estadística ambiental',
              ])
            ) {
              for (let R2 = R; R2 <= range.e.r; R2++) {
                for (let C2 = C + 1; C2 <= range.e.c; ++C2) {
                  const cellref2 = XLSX.utils.encode_cell({ c: C2, r: R2 });
                  const cell2 = sheet[cellref2];
                  if (
                    cell2 !== undefined &&
                    typeof cell2 === 'object' &&
                    'v' in cell2
                  ) {
                    data = cell2.v;
                    rowIndex = R2;
                    foundValue = true;
                    break; // Salir del bucle una vez que se encuentra un valor
                  }
                }
                if (foundValue) break;
              }
            }
          }
          if (foundValue) break;
        }
        if (foundValue) break;
      }
      if (data === undefined) {
        return {
          nombreIndicador: '',
          rowIndex: null,
        };
      } else {
        return { nombreIndicador: data, rowIndex: rowIndex };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  getTablaDatosTitulo(
    sheet: Sheet
  ): { title: string; separatedContent: string; description: string } | null {
    // Obtener el valor de la celda A1
    const cellA1Ref = 'A1';
    const cellA1 = sheet[cellA1Ref];
    if (cellA1 && cellA1.t === 's' && cellA1.v) {
      const cellValue: string = cellA1.v;
      const regex = /^(.*?):\s*(.*)$/;
      const match = cellValue.match(regex);
      if (match && match.length === 3) {
        const title = match[1].trim();
        const separatedContent = match[2].trim();
        return { title, separatedContent, description: cellValue };
      } else {
        // Si no se encuentra ":" o el formato no es válido, retornar null
        return { title: '', separatedContent: '', description: cellValue };
      }
    } else {
      return null;
    }
  }
  getContentCell(
    sheet: XLSX.WorkSheet,
    nombreBuscar: string
  ): {
    cell: XLSX.CellObject;
    nextCell: XLSX.CellObject;
    separatedContent: string;
  } | null {
    // Obtener el rango de celdas de la hoja
    const range = XLSX.utils.decode_range(sheet['!ref']);

    // Iterar sobre todas las celdas del rango
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        // Obtener la referencia de la celda actual
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = sheet[cellRef];

        // Verificar si el contenido de la celda es igual al nombre buscado
        if (
          cell &&
          typeof cell.v === 'string' &&
          cell.v.includes(nombreBuscar)
        ) {
          // Encontramos la celda con el nombre buscado, ahora obtenemos la siguiente celda
          const nextCellRef = XLSX.utils.encode_cell({ r: R, c: C + 1 });
          const nextCell = sheet[nextCellRef];

          const content = cell.v;
          const regex = new RegExp(`${nombreBuscar}\\s*\\s*(.*)`, 'i');
          const matches = content.match(regex);
          const separatedContent =
            matches && matches.length === 2 ? matches[1] : '';

          return {
            cell: cell,
            nextCell: nextCell,
            separatedContent: separatedContent,
          };
        }
      }
    }
    return null;
  }
  getSheetData(workbook: XLSX.WorkBook, sheetIndex: number): Cell[][] {
    const sheetName: string = workbook.SheetNames[sheetIndex];
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    return this.getCellsMatrix(cellMap, sheet);
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
        let value: string | number = td?.getAttribute('data-v') || '';
        const type = (td?.getAttribute('data-t') as 'n' | 's') || 's';
        let formatoNumero = '';
        let textoFormateado = '';
        if (td) {
          const cellAddress = td.getAttribute('id').replace('sjs-', '');
          const cell = sheet[cellAddress];
          formatoNumero = cell?.z || '';
          textoFormateado = cell?.w || '';
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
    if (this.isHederRow(row, rowIndex)) {
      return CELL_POSITION_HEADER;
    }
    // Footer row
    if (this.isFooterRow(row, rowIndex)) {
      return CELL_POSITION_BODY;
    }
    // Body row
    return CELL_POSITION_BODY;
  }
  isHederRow(row: HTMLTableCellElement[], rowIndex): boolean {
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
  getSheetDataMap(
    workbook: XLSX.WorkBook,
    sheetIndex: number
  ): HtmlCellsMatrix {
    const sheetName: string = workbook.SheetNames[sheetIndex];
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    const rows = getSheetHtmlRows(sheet);
    return this.createCellsDataMap(rows);
  }
  getSheetByIndex(workbook: XLSX.WorkBook, sheetIndex: number): XLSX.WorkSheet {
    const sheetName: string = workbook.SheetNames[sheetIndex];
    return workbook.Sheets[sheetName];
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
  getCellAddress(cell: HTMLTableCellElement): string {
    return cell.getAttribute('id').replace('sjs-', '');
  }
  getCellCoordinates(cell: HTMLTableCellElement): {
    rowIndex: number;
    colIndex: number;
  } {
    const cellAddress = this.getCellAddress(cell);
    return this.cellAddressToCoordinates(cellAddress);
  }
  // Función para analizar el área de búsqueda y determinar si contiene datos de la tabla
  analyzeSearchArea(sheet: any, startCell: any, endCell: any): void {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const startCol = XLSX.utils.decode_col(startCell.replace(/\d/g, '')); // Obtener el número de columna del inicio del área de búsqueda
    const endCol = XLSX.utils.decode_col(endCell.replace(/\d/g, '')); // Obtener el número de columna del final del área de búsqueda
    let consecutiveNumericValues = 0; // Contador para valores numéricos consecutivos
    const minConsecutiveValues = 3; // Mínimo número de valores numéricos consecutivos para considerar como datos de la tabla
    // Recorrer las filas dentro del área de búsqueda
    for (let R = range.s.r; R <= range.e.r; ++R) {
      let consecutiveValuesInRow = 0; // Contador para valores consecutivos en la fila
      let lastCellValue = null; // Valor de la celda anterior en la fila

      // Recorrer las columnas dentro del área de búsqueda
      for (let C = startCol; C <= endCol; ++C) {
        const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
        const cell = sheet[cellRef] ? sheet[cellRef].v : null;
        // Verificar si el valor de la celda es numérico y si es consecutivo al valor anterior
        if (
          !isNaN(cell) &&
          (lastCellValue === null || cell === lastCellValue + 1)
        ) {
          consecutiveValuesInRow++;
        } else {
          consecutiveValuesInRow = 0; // Reiniciar el contador si el valor no es consecutivo
        }
        // Actualizar el valor de la celda anterior
        lastCellValue = cell;
        // Verificar si se encontraron suficientes valores numéricos consecutivos
        if (consecutiveValuesInRow >= minConsecutiveValues) {
          consecutiveNumericValues++;
          break; // Salir del bucle si se encontraron suficientes valores consecutivos en la fila
        }
      }
      // Salir del bucle si se encontraron suficientes valores numéricos consecutivos en varias filas
      if (consecutiveNumericValues >= minConsecutiveValues) {
        break;
      }
    }
    // Verificar si se encontraron suficientes valores numéricos consecutivos en varias filas
    if (consecutiveNumericValues >= minConsecutiveValues) {
      console.info('Se encontraron datos de tabla en el área de búsqueda.');
      // Aquí puedes realizar acciones adicionales, como retornar true o ejecutar otras funciones
    } else {
      console.warn('No se encontraron datos de tabla en el área de búsqueda.');
      // Aquí puedes realizar acciones adicionales, como retornar false o ejecutar otras funciones
    }
  }
  getEstadisticaFieldsFichaTecnica(
    workbook: XLSX.WorkBook,
    sheetIndex: number
  ): FichaTecnicaFields {
    const sheetName: string = workbook.SheetNames[sheetIndex];
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    const matrix = this.getCellsMatrixFichaTecnica(cellMap);
    return this.filterValueFichaTecnica(matrix);
  }
  getCellsMatrixFichaTecnica(cellMap): Cell[][] {
    const out: Cell[][] = [];
    cellMap.forEach((row, rowIndex) => {
      let colIndex = 0;
      const rowData: Cell[] = [];
      const cellPostion = this.getRowPosition(row, rowIndex);
      row.forEach((td) => {
        if (td !== null) {
          const colSpan = +td.getAttribute('colspan') || 1;
          const rowSpan = +td.getAttribute('rowspan') || 1;
          let value: string | number = td.getAttribute('data-v') || '';
          const type = (td.getAttribute('data-t') as 'n' | 's') || 's';
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
          // Añade colspan y rowspan si son mayores a 1
          if (colSpan > 1) {
            dataCell.s = colSpan;
          }
          if (rowSpan > 1) {
            dataCell.rs = rowSpan;
          }
          if (
            (typeof dataCell.v === 'number' && !isNaN(dataCell.v)) ||
            (typeof dataCell.v === 'string' && dataCell.v.trim() !== '')
          ) {
            rowData.push(dataCell);
            colIndex += colSpan;
          }
        }
      });
      out.push(rowData);
    });
    return out;
  }
  calculateSimilarity = (str1, str2) => {
    const minLn = Math.min(str1.length, str2.length);
    const maxLn = Math.max(str1.length, str2.length);
    let commonChars = 0;
    for (let i = 0; i < minLn; i++) {
      if (str1[i] === str2[i]) {
        commonChars++;
      }
    }
    return commonChars / maxLn;
  };
  removeAccents = (string) => {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  toSnakeCase = (string) => {
    return this.removeAccents(string)
      .replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+/g, '_')
      .replace(/^(?:_+|_+)$/g, '')
      .toLowerCase();
  };
  filterValueFichaTecnica(out) {
    const resultMap = {};
    out.forEach((row) => {
      row.forEach((cell, index) => {
        const snakeCaseKey = this.toSnakeCase(cell.v.toString());
        const matchedKey = Object.keys(FICHA_FIELDS_MAP).find((key) => {
          const camelCaseKey = this.toSnakeCase(key);
          const similarity = this.calculateSimilarity(
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
  getCellTabla(sheet) {
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    const matrix = this.getCellsMatrixFichaTecnica(cellMap);
    const data = {
      fuente: this.getFieldData('Fuente:', matrix),
      nota: this.getFieldData('Nota:', matrix),
      elaboracion: this.getFieldData('Elaboración:', matrix),
      titulo: ''
    };
    matrix.forEach((row) => {
      row.forEach((cell) => {
        if (typeof cell.v === 'number' && typeof cell.v !== 'string') {
          return;
        }
        if (!data.titulo) {
          data.titulo = cell.v.toString();
        }
      });
    });
    return data;
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
    // Extraer la nota de la misma celda
    let nota = cellRefValue.replace(fieldKeyword, '').trim();
    if (nota) {
      out.push(nota);
    }
    // Exraer nota de la siguiente celda
    const nextCell = matrix[cellRefRowIndex][cellRefColIndex + 1];
    nota = nextCell?.v.toString().trim();
    if (nota) {
      out.push(nota);
    }
    // Extraer nota de la siguientes celdas
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
  checkCell(cell, rowIndex, cellIndex) {
    const snakeCaseKey = this.toSnakeCase(cell.v.toString());
    const matchedKey = Object.keys(ESTADISTICA_DATOS).find((key) => {
      const camelCaseKey = this.toSnakeCase(key);
      const snakeCaseKeyWords = snakeCaseKey.split('_');
      if (snakeCaseKeyWords.includes(camelCaseKey)) {
        const similarity = this.calculateSimilarity(snakeCaseKey, camelCaseKey);
        return similarity >= 0.5;
      }
    });
    if (matchedKey) {
      return { matchedKey, rowIndex, cellIndex };
    }
  }
}

export default ExtractDataExcelService.getInstance();
