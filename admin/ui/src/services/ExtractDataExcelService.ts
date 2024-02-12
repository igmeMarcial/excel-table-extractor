import * as XLSX from "xlsx";

interface Sheet {
  [key: string]: any; // Tipo genérico para la celda
}

interface Range {
  s: { r: number; c: number }; // Coordenadas de la primera celda en el rango
  e: { r: number; c: number }; // Coordenadas de la última celda en el rango
}

class ExtractDataExcelService {
  
  readExcelFile(file:File):Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e:ProgressEvent<FileReader>) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error:ProgressEvent<FileReader>) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  getAllSheetNames(file: File):Promise<string[]> {
    return this.readExcelFile(file).then((workbook: XLSX.WorkBook) => {
      const sheetNames: string[] = workbook.SheetNames;
      return sheetNames;
    });
  }

  async extractDataFromFile(workbook: XLSX.WorkBook, sheetIndex:number):Promise<{sheetData: any[];tableData:any}> {
       try {
        // Obtener el nombre de la hoja utilizando el índice proporcionado
        const sheetName: string = workbook.SheetNames[sheetIndex];
        // Datos de la primera hoja seleccionada
        const firstSheetData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        // Obtener datos de la tabla
        const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        const tableData: any = this.extractTableData(sheet);
        // Retornar los datos de la hoja y la tabla
        return { sheetData: firstSheetData, tableData: tableData };
    } catch (error) {
        console.log(error)
        throw error;
    }
  }
  getNameIndicador(workbook: XLSX.WorkBook, sheetIndex:number):Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Obtener la hoja en función del índice proporcionado
        const sheetName:string = workbook.SheetNames[sheetIndex];
        const sheet:XLSX.WorkSheet = workbook.Sheets[sheetName];
        let data: string | undefined;
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        let foundValue = false;

        const validarCadenaFlex = (cadena: string, cadenasObjetivo: string[]):boolean => {
          const cadenaNormalizada = cadena
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          return cadenasObjetivo.some((objetivo) => {
            const objetivoNormalizado = objetivo
              .trim()
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            return cadenaNormalizada.includes(objetivoNormalizado);
          });
        };

        //iterando
        for (let R = range.s.r; R <= range.e.r; R++) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellref = XLSX.utils.encode_cell({ c: C, r: R });
            const cell = sheet[cellref];
            if (cell !== undefined && typeof cell === "object" && "v" in cell) {
              const cellValue = String(cell.v);
              if (
                validarCadenaFlex(cellValue, [
                  "Nombre del indicador",
                  "estadística ambiental",
                  "Nombre del indicador o estadística ambiental",
                ])
              ) {
                for (let R2 = R; R2 <= range.e.r; R2++) {
                  for (let C2 = C + 1; C2 <= range.e.c; ++C2) {
                    const cellref2 = XLSX.utils.encode_cell({ c: C2, r: R2 });
                    const cell2 = sheet[cellref2];
                    if (
                      cell2 !== undefined &&
                      typeof cell2 === "object" &&
                      "v" in cell2
                    ) {
                      
                      data = cell2.v;
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
          resolve(
            "Nombre del indicador o estadística ambiental no se encuentra en esta hoja"
          );
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  extractTableData(sheet:Sheet): any[] {
    const tableData: any[] = [];
    const range:Range = XLSX.utils.decode_range(sheet["!ref"] );
    let headerRowIndex: number | null = null;
    let headerColumnEnd: number | null = null;
    let headerColumnIndex: number | null = null;

    console.log(sheet);

    // Analizar las filas dentro del rango de referencia
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const rowData: any[] = [];
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellref = XLSX.utils.encode_cell({ c: C, r: R });
        const cell = sheet[cellref] ? sheet[cellref].v : null;
        rowData.push(cell);
      }
      // Buscar un encabezado característico
      if (this.isTableHeader(rowData)) {
        headerRowIndex = R;
        break;
      }
    }

    // Si ya se encontró el encabezado y el índice de la columna aún no se ha establecido, buscar el índice de la columna del encabezado
    if (headerRowIndex !== null && headerColumnIndex === null) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellref = XLSX.utils.encode_cell({ c: C, r: headerRowIndex });
        const cell = sheet[cellref] ? sheet[cellref].v : null;
        if (cell !== null && cell !== "") {
          headerColumnIndex = C;
          break;
        }
      }
    }
    if (headerRowIndex !== null && headerColumnIndex !== null) {
      for (let C = headerColumnIndex; C <= range.e.c; ++C) {
        const cellref = XLSX.utils.encode_cell({ c: C, r: headerRowIndex });
        const cell = sheet[cellref] ? sheet[cellref].v : null;

        if (cell === null || cell === "") {
          headerColumnEnd = C - 1; // La columna anterior no tuvo datos, por lo que esta es la última columna del encabezado
          break;
        }
      }
    }
    console.log(headerRowIndex);
    console.log(headerColumnIndex);
    console.log(headerColumnEnd);

    // Si se encuentra el encabezado, extraerlo
    if (headerRowIndex !== null) {
      const startRow = headerRowIndex; // La fila siguiente al encabezado
      const startCol = headerColumnIndex; // La primera columna del rango
      const endRow = range.e.r; // La última fila del rango
      let endCol = headerColumnEnd; // La última columna del rango

      // Definir el nuevo rango de celdas
      const searchStartCell = XLSX.utils.encode_cell({
        c: startCol,
        r: startRow,
      });
      const searchEndCell = XLSX.utils.encode_cell({ c: endCol, r: endRow });

      // Llamar a la función setSearchArea para establecer el área de búsqueda
      this.setSearchArea(sheet, searchStartCell, searchEndCell);

      // Llamar a la función analyzeSearchArea para analizar el área de búsqueda
      // this.analyzeSearchArea(sheet, searchStartCell, searchEndCell);

      // Procesar los datos dentro del área de búsqueda y agregarlos a tableData
      //aqui la logica de extraer datos
      const umbral = 0.5;

      const filaEsParteDeTabla = (rowData) => {
        let countDataCells = 0;
        for (let cell of rowData) {
          if (cell !== null && cell !== "") {
            countDataCells++;
          }
        }
        // Calcular el porcentaje de celdas con datos
        const dataCellPercentage = countDataCells / rowData.length;
        // Verificar si el porcentaje supera el umbral
        return dataCellPercentage > umbral;
      };
      for (let R = startRow; R <= endRow; ++R) {
        const rowData = [];
        for (let C = startCol; C <= endCol; ++C) {
          const cellref = XLSX.utils.encode_cell({ c: C, r: R });
          const cell = sheet[cellref] ? sheet[cellref].v : null;
          rowData.push(cell);
        }
        // Verificar si la fila es parte de la tabla antes de agregarla a tableData
        if (filaEsParteDeTabla(rowData)) {
          tableData.push(rowData);
        } else {
          // Si una fila no es parte de la tabla, detenemos la iteración
          break;
        }
      }
    }
    return tableData;
  }
  setSearchArea(sheet, startCell, endCell) {
    // Obtener el rango de celdas
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    // Obtener las coordenadas de inicio y fin del área de búsqueda
    const { c: startCol, r: startRow } = XLSX.utils.decode_cell(startCell);
    const { c: endCol, r: endRow } = XLSX.utils.decode_cell(endCell);

    // Actualizar el rango de celdas
    range.s.c = startCol;
    range.s.r = startRow;
    range.e.c = endCol;
    range.e.r = endRow;

    // console.log(startCol);
    // console.log(startRow);
    // console.log(endCol);
    // console.log(endRow);

    // Actualizar el atributo "!ref" de la hoja con el nuevo rango de celdas
    sheet["!ref"] = XLSX.utils.encode_range(range);
  }
  isTableHeader(rowData) {
    // Verifica si la fila tiene al menos una cierta cantidad de celdas con datos
    const minDataCells = 3; // Define el mínimo número de celdas con datos para considerar como encabezado
    const dataCellsCount = rowData.filter(
      (cell) => cell !== null && cell !== ""
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
  analyzeSearchArea(sheet, startCell, endCell) {
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    const startCol = XLSX.utils.decode_col(startCell.replace(/\d/g, "")); // Obtener el número de columna del inicio del área de búsqueda
    const endCol = XLSX.utils.decode_col(endCell.replace(/\d/g, "")); // Obtener el número de columna del final del área de búsqueda

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
      console.log("Se encontraron datos de tabla en el área de búsqueda.");
      // Aquí puedes realizar acciones adicionales, como retornar true o ejecutar otras funciones
    } else {
      console.log("No se encontraron datos de tabla en el área de búsqueda.");
      // Aquí puedes realizar acciones adicionales, como retornar false o ejecutar otras funciones
    }
  }
  extractIndicatortechnicalSheet(workbook: XLSX.WorkBook, sheetIndex: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        const sheetName = workbook.SheetNames[sheetIndex];
        const sheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(sheet["!ref"]);

        let result = [];
        let row;
        let rowNum;
        let colNum;

        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          let rowHasData = false;
          let row = [];
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            let nextCell =
              sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
            if (nextCell && typeof nextCell !== "undefined" && nextCell.w) {
              row.push(nextCell.w);
              rowHasData = true;
            }
          }
          if (rowHasData) {
            result.push(row);
          }
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ExtractDataExcelService;
