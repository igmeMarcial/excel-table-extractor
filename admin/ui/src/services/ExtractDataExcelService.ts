import * as XLSX from 'xlsx';
import { FICHA_FIELDS_MAP } from '../pages/indicadores/editor/FichaFieldsMap';
import { DataCell } from '../types/DataCell';
import { FichaTecnicaFields } from '../types/Estadistica';
import { EstadisticaDatos } from '../types/EstadisticaDatos';
import { RangoCeldas } from '../types/RangoCeldas';
import { getSheetHtmlRows } from '../utils/xmls-utils';

type HtmlCellsMatrix = HTMLTableCellElement[][];
interface Sheet {
  [key: string]: any; // Tipo genérico para la celda
}
interface Range {
  s: { r: number; c: number }; // Coordenadas de la primera celda en el rango
  e: { r: number; c: number }; // Coordenadas de la última celda en el rango
}
interface ResultObject {
  [key: string]: string;
}
//TODO: Fusionar models
class ExtractDataExcelService {
  //Get wor
  readExcelFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error: ProgressEvent<FileReader>) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  //
  getExcelSheetNames(file: File): Promise<string[]> {
    return this.readExcelFile(file).then((workbook: XLSX.WorkBook) => {
      const sheetNames: string[] = workbook.SheetNames;
      return sheetNames;
    });
  }
  //
  extractDataFromFile(workbook: XLSX.WorkBook, sheetIndex: number): EstadisticaDatos {
    try {
      const sheetName: string = workbook.SheetNames[sheetIndex];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      //text extract new table
      const tableData: any = this.extractTableDataNew(sheet);
      const contentCellTitle: any = this.getTablaDatosTitulo(sheet);
      const contentCellFuente: any = this.getContentCell(sheet, 'Fuente:');
      const contentCellNote: any = this.getContentCell(sheet, 'Nota:');
      const contentCellElaboration: any = this.getContentCell(
        sheet,
        'Elaboración:'
      );
      const transformedSheetData: EstadisticaDatos = {
        nombre: contentCellTitle
          ? contentCellTitle.separatedContent ||
          contentCellTitle.description ||
          ''
          : '',
        nota: contentCellNote
          ? contentCellNote.separatedContent ||
          contentCellNote.nextCell?.v ||
          contentCellNote.cell?.v ||
          ''
          : '',
        fuente: contentCellFuente
          ? contentCellFuente.separatedContent ||
          contentCellFuente.nextCell?.v ||
          contentCellFuente.cell?.v ||
          ''
          : '',
        elaboracion: contentCellElaboration
          ? contentCellElaboration.separatedContent ||
          contentCellElaboration.nextCell?.v ||
          contentCellElaboration.cell?.v ||
          ''
          : '',
        tabla: tableData,
      };
      //tranfor Data
      return transformedSheetData;
    } catch (error) {
      console.log(error);
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

  //

  extractTableDataNew(sheet: Sheet): DataCell[][] {
    const out: DataCell[][] = [];
    const htmlRows = getSheetHtmlRows(sheet);
    const cellMap = this.createCellsDataMap(htmlRows);
    let htmlTablaDatos = this.getHtmlTablaDatos(cellMap);
    htmlTablaDatos.forEach((row, i) => {
      let colIndex = 0;
      const rowData: DataCell[] = [];
      row.forEach((cell) => {
        const colSpan = +cell.getAttribute('colspan') || 1;
        const rowSpan = +cell.getAttribute('rowspan') || 1;
        // TODO: Mejorar algoritmo para obtener el tipo de celda
        const typeCell = i === 0 ? 'header' : 'body';
        const value = cell.getAttribute('data-v') || '';
        const type = isNaN(Number(value)) ? 'string' : 'number';

        rowData.push({
          value,
          colIndex,
          rowIndex: i,
          colSpan,
          rowSpan,
          typeCell,
          type,
        });
        colIndex += colSpan;
      });
      out.push(rowData);
    });
    return out;
  }

  getHtmlTablaDatos(rows: HtmlCellsMatrix): HtmlCellsMatrix {
    let out = []
    const { inicio, fin } = this.getRangoTablaDatos(rows)
    console.log(inicio, fin)
    for (let i = inicio.rowIndex; i <= fin.rowIndex; i++) {
      const outRow = []
      for (let j = inicio.colIndex; j <= fin.colIndex; j++) {
        const cell = rows[i][j]
        if (cell) {
          const { rowIndex, colIndex } = this.getCellCoordinates(cell);
          if (i === rowIndex && j === colIndex) {
            outRow.push(cell)
          }
        }
      }
      out.push(outRow)
    }
    return out
  }
  setDataMapValues(map: any[][], value: any, rowIndex: number, colIndex: number, rows: number = 1, cols: number = 1) {
    for (let i = rowIndex; i < rowIndex + rows; i++) {
      for (let j = colIndex; j < colIndex + cols; j++) {
        map[i][j] = value;
      }
    }
  }
  cellAddressToCoordinates(cellAddress: string): { rowIndex: number, colIndex: number } {
    const colLetter = cellAddress.match(/[A-Z]+/g)[0];
    const rowNumber = cellAddress.match(/[0-9]+/g)[0];
    const colIndex = XLSX.utils.decode_col(colLetter);
    const rowIndex = +rowNumber - 1;
    return { rowIndex, colIndex };
  }
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
        const { rowIndex, colIndex } = this.cellAddressToCoordinates(cellAddress);
        this.setDataMapValues(cellsDataMap, td, rowIndex, colIndex, rowSpan, colSpan);
      })
    })
    return cellsDataMap;
  }
  getRangoTablaDatos(rows: HtmlCellsMatrix): RangoCeldas {
    const maxDataColums = this.getMaxDataColums(rows);
    const maxColIndex = rows[0].length - 1;
    let startRowIndex = -1;
    let endRowIndex = -1;
    // Iterar filas para determinar la fila de inicio y fin
    rows.forEach((tr, i) => {
      const notEmpty = tr.filter((td) => this.isNotEmptyCell(td));
      const totalNotEmptyCells = notEmpty.length;
      const totalUniqueCells = (new Set(notEmpty)).size;
      console.log(totalUniqueCells)

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
        console.log(cell)
      }
      // Se considera como columna de inicio la primera columna que tenga datos en todas las filas
      if (totalNotEmptyCell === endRowIndex - startRowIndex + 1 && startColIndex === -1 && uniqueCells.size > 1) {
        startColIndex = colIndex;
      }
      // Se considera como columna de fin la última columna que tenga datos en todas las filas
      if (totalNotEmptyCell === endRowIndex - startRowIndex + 1 && startColIndex !== -1 && uniqueCells.size > 1) {
        endColIndex = colIndex;
      }
    }
    return {
      inicio: {
        rowIndex: startRowIndex,
        colIndex: startColIndex,
      },
      fin: {
        rowIndex: endRowIndex,
        colIndex: endColIndex
      }
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
  getCellCoordinates(cell: HTMLTableCellElement): { rowIndex: number, colIndex: number } {
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
    try {
      const sheetName = workbook.SheetNames[sheetIndex];
      const sheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      const resultObject: ResultObject = {};
      let result: string[][] = [];
      let combinedData: string[] = [];
      const { rowIndex } = this.getNameIndicador(workbook, sheetIndex);
      let start = rowIndex || 3; //range.s.r
      for (let rowNum = start; rowNum <= range.e.r; rowNum++) {
        let rowHasPattern = false;
        let rowData: string[] = [];
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
          let cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
          let cellValue = sheet[cellAddress] ? sheet[cellAddress].w : '';
          if (cellValue.trim().length > 0) {
            rowData.push(cellValue);
            rowHasPattern = true;
          }
        }

        if (rowData.length === 0) {
          break;
        }
        if (rowHasPattern) {
          if (rowData.length > 1) {
            if (combinedData.length > 0) {
              result.push(combinedData); // Agrega datos combinados previamente almacenados al resultado
              combinedData = []; // Reinicia combinedData
            }
            combinedData = combinedData.concat(rowData); // Almacena datos combinados en combinedData
          } else {
            combinedData[combinedData.length - 1] += ', ' + rowData.join(', ');
          }
        }
      }
      if (combinedData.length > 0) {
        result.push(combinedData);
      }

      //transforData
      const calculateSimilarity = (str1, str2) => {
        const len = Math.min(str1.length, str2.length);
        let commonChars = 0;
        for (let i = 0; i < len; i++) {
          if (str1[i] === str2[i]) {
            commonChars++;
          }
        }
        return commonChars / len;
      };
      const removeAccents = (string) => {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };

      const toSnakeCase = (string) => {
        return removeAccents(string)
          .replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+/g, '_')
          .replace(/^(?:_+|_+)$/g, '')
          .toLowerCase();
      };

      if (result && result.length > 0) {
        result.forEach((row) => {
          const firstNonNumberValue = row.find((value) => isNaN(Number(value)));
          if (typeof firstNonNumberValue === 'string') {
            const snakeCaseKey = toSnakeCase(firstNonNumberValue);
            const matchedKey = Object.keys(FICHA_FIELDS_MAP).find((key) => {
              const camelCaseKey = toSnakeCase(key);
              const similarity = calculateSimilarity(
                snakeCaseKey,
                camelCaseKey
              );
              return similarity >= 0.5;
            });
            if (matchedKey) {
              resultObject[FICHA_FIELDS_MAP[matchedKey]] = row[row.length - 1];
            }
          }
        });
      }
      return resultObject;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default ExtractDataExcelService;
