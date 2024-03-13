import * as XLSX from 'xlsx';
import tablaDatosHelper from '../helpers/TablaDatosHelper';
import { FICHA_FIELDS_MAP } from '../pages/indicadores/editor/FichaFieldsMap';
import { DataCell } from '../types/DataCell';
import { FichaTecnicaFields } from '../types/Estadistica';
import { EstadisticaDatos } from '../types/EstadisticaDatos';
import { start } from 'repl';

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
  extractDataFromFile(
    workbook: XLSX.WorkBook,
    sheetIndex: number
  ): EstadisticaDatos {
    try {
      const sheetName: string = workbook.SheetNames[sheetIndex];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      // const tableData: any = this.extractTableData(sheet);

      //text extract new table
      const tableData: any = this.extractTableDataNew(sheet);
      console.log(tableData)
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
    const tableData: any[] = [];
    const html = XLSX.utils.sheet_to_html(sheet);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const allTr = doc.querySelectorAll('tr:has(td[data-v])');
    let maxDataColums = 0;
    let tableDataR = [];

    allTr.forEach((tr) => {
      const tdWithValues = tr.querySelectorAll('td[data-v]');
      if (tdWithValues.length > maxDataColums) {
        maxDataColums = tdWithValues.length;
      }
    });

    let startRowIndex = -1;
    let endRowIndex = -1;
    allTr.forEach((tr, i) => {
      let totalCols = 0;
      const tdWithValues = tr.querySelectorAll('td[data-v]');
      tdWithValues.forEach((element) => {
        const colSpan = element.getAttribute('colspan')
          ? +element.getAttribute('colspan')
          : 1;
        totalCols += colSpan;
      });
      if (
        totalCols === maxDataColums &&
        startRowIndex === -1 &&
        tdWithValues.length > 1
      ) {
        startRowIndex = i;
      }
      if (
        totalCols === maxDataColums &&
        endRowIndex === -1 &&
        tdWithValues.length > 1
      ) {
        endRowIndex = i;
      }
    });

    allTr.forEach((tr, i) => {
      if (i >= startRowIndex && i >= endRowIndex) {
        tableDataR.push(tr);
      }
    });

    tableDataR.forEach((tr, i) => {
      const tdElements = tr.querySelectorAll('td[data-v]');
      let colIndex = 0;
      const rowData: DataCell[] = [];
      tdElements.forEach((cell, index) => {
        const colSpan = cell.getAttribute('colspan')
          ? +cell.getAttribute('colspan')
          : 1;
        const rowSpan = cell.getAttribute('rowspan')
          ? +cell.getAttribute('rowspan')
          : 1;

        rowData.push({
          value: cell.getAttribute('data-v'),
          colIndex,
          rowIndex: i,
          colSpan,
          rowSpan,
        });
        colIndex += colSpan;
      });
      tableData.push(rowData);
    });
    // console.log(tableData);
    return tableData;
  }
  extractTableData(sheet: Sheet): DataCell[][] {
    const tableData: any[] = [];
    const range: Range = XLSX.utils.decode_range(sheet['!ref']);
    let headerRowIndex: number | null = null;
    let headerColumnIndex: number | null = null;
    let headerColumnEnd: number | null = null;

    for (let i = range.s.r; i <= range.e.r; ++i) {
      const rowData: any[] = [];
      for (let j = range.s.c; j <= range.e.c; ++j) {
        const cellref = XLSX.utils.encode_cell({ c: j, r: i });
        const cell = sheet[cellref] ? sheet[cellref].v : null;
        rowData.push(cell);
      }
      if (this.isTableHeader(rowData)) {
        headerRowIndex = i;
        break;
      }
    }

    // Si ya se encontró el encabezado y el índice de la columna aún no se ha establecido, buscar el índice de la columna del encabezado
    if (headerRowIndex !== null) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellref = XLSX.utils.encode_cell({ c: C, r: headerRowIndex });
        const cell = sheet[cellref] ? sheet[cellref].v : null;
        if (cell !== null && cell !== '') {
          headerColumnIndex = C;
          break;
        }
      }
    }
    if (headerRowIndex !== null && headerColumnIndex !== null) {
      let emptyCellFound = false;
      let lastNonEmptyColumn = headerColumnIndex;
      for (let C = headerColumnIndex; C <= range.e.c; ++C) {
        const cellref = XLSX.utils.encode_cell({ c: C, r: headerRowIndex });
        const cell = sheet[cellref] ? sheet[cellref].v : null;
        if (cell === null || cell === '') {
          // Si la celda está vacía, establece headerColumnEnd en el valor anterior de C
          headerColumnEnd = C - 1;
          emptyCellFound = true; // Marca que se encontró una celda vacía
          break;
        } else {
          lastNonEmptyColumn = C;
        }
      }
      if (!emptyCellFound) {
        headerColumnEnd = lastNonEmptyColumn;
      }
    }

    // Si se encuentra el encabezado, extraerlo
    if (headerRowIndex !== null) {
      const startRow = headerRowIndex; // La fila siguiente al encabezado
      const startCol = headerColumnIndex; // La primera columna del rango
      const endRow = range.e.r; // La última fila del rango
      let endCol = headerColumnEnd; // La última columna del rango

      const searchStartCell = XLSX.utils.encode_cell({
        c: startCol,
        r: startRow,
      });
      const searchEndCell = XLSX.utils.encode_cell({ c: endCol, r: endRow });
      // Llamar a la función analyzeSearchArea para analizar el área de búsqueda
      this.analyzeSearchArea(sheet, searchStartCell, searchEndCell);

      for (let i = startRow; i <= endRow; ++i) {
        // const rowData: DataCell[] = [];
        const rowData: any[] = [];
        for (let j = startCol; j <= endCol; ++j) {
          const cellref = XLSX.utils.encode_cell({ c: j, r: i });
          const value = sheet[cellref] ? sheet[cellref].v : null;

          //Determinar si es header o body
          const typeCell = i === headerRowIndex ? 'header' : 'body';
          const type = typeof value === 'number' ? 'number' : 'string';
          rowData.push({
            value: value,
            rowIndex: i,
            colIndex: j,
            colSpan: 1,
            rowSpan: 1,
            typeCell,
            type,
          });
        }
        // Verificar si la fila es parte de la tabla antes de agregarla a tableData
        if (this.filaEsParteDeTabla(rowData)) {
          tableData.push(rowData);
        } else {
          // Si una fila no es parte de la tabla, detenemos la iteración
          break;
        }
      }
    }
    // console.log(tableData);
    return tableData;
    //return tablaDatosHelper.getTablaDatosFromRawArrays(tableData);
  }
  filaEsParteDeTabla = (rowData: DataCell[]) => {
    // Procesar los datos dentro del área de búsqueda y agregarlos a tableData
    //aqui la logica de extraer datos
    const umbral = 0.5;
    let countDataCells = 0;
    for (let cell of rowData) {
      if (cell.value !== null && cell.value !== '') {
        countDataCells++;
      }
    }
    // Calcular el porcentaje de celdas con datos
    const dataCellPercentage = countDataCells / rowData.length;
    // Verificar si el porcentaje supera el umbral
    return dataCellPercentage > umbral;
  };
  isTableHeader(rowData) {
    // Verifica si la fila tiene al menos una cierta cantidad de celdas con datos
    const minDataCells = 3; // Define el mínimo número de celdas con datos para considerar como encabezado
    const dataCellsCount = rowData.filter(
      (cell) => cell !== null && cell !== ''
    ).length;
    if (dataCellsCount >= minDataCells) {
      // Si la fila tiene suficientes celdas con datos, considerarla como encabezado
      return true;
    } else {
      // De lo contrario, no es un encabezado
      return false;
    }
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
