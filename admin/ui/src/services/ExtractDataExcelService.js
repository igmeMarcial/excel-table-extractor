import * as XLSX from "xlsx";

class ExtractDataExcelService {
  constructor() {}
  readExcelFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  getAllSheetNames(file) {
    return this.readExcelFile(file).then((workbook) => {
      const sheetNames = workbook.SheetNames;
      return sheetNames;
    });
  }

  async extractDataFromFile(workbook, sheetIndex) {
    return new Promise((resolve, reject) => {
      try {
        // Obtener el nombre de la hoja utilizando el índice proporcionado
        const sheetName = workbook.SheetNames[sheetIndex];
        // Datos de la primera hoja seleccionada
        const firstSheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
        // Obtener datos de la tabla
        const sheet = workbook.Sheets[sheetName];
        const tableData = this.extractTableData(sheet);
        // Resuelvo una promesa con los datos de la hoja y la tabla
        resolve({ sheetData: firstSheetData, tableData: tableData });
      } catch (error) {
        // Capturar cualquier error y rechazar la promesa con el error correspondiente
        reject(error);
      }
    });
  }
  getNameIndicador(workbook, sheetIndex) {
    return new Promise((resolve, reject) => {
      try {
        // Obtener la hoja en función del índice proporcionado
        const sheetName = workbook.SheetNames[sheetIndex];
        const sheet = workbook.Sheets[sheetName];
        let data;
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        let foundValue = false;

        const validarCadenaFlex = (cadena, cadenasObjetivo) => {
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
                      console.log(cell2.v);
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

  extractTableData(sheet) {
    const tableData = [];
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    let startRow = 3; //referencia que la tabla comienza en A4
    let startCol = 0;
    let isEmpty = false;
    for (let R = startRow; R <= range.e.r; ++R) {
      const rowData = [];
      isEmpty = true;
      for (let C = startCol; C <= range.e.c; ++C) {
        const cellref = XLSX.utils.encode_cell({ c: C, r: R });
        if (!sheet[cellref]) {
          break;
        }
        const cell = sheet[cellref];
        if (cell.v === undefined || cell.v === null || cell.v === "") {
          continue;
        }
        rowData.push(cell.v);
        isEmpty = false;
      }
      if (isEmpty) {
        break;
      }
      if (rowData.length > 0) {
        tableData.push(rowData);
      }
    }

    return tableData;
  }
  extractIndicatortechnicalSheet(workbook, sheetIndex) {
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
