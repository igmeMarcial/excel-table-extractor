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
      console.log(sheetNames);
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

        // Obtener el valor de la celda D5
        const cellD5 = sheet["D5"];
        const cellData = cellD5 ? cellD5.v : null;

        resolve(cellData);
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

        const extractedData = [];
        const objectData = {};

        //Recorriendo el excel
        for (let R = range.s.r; R <= range.e.r; ++R) {
          const rowData = [];
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: R };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = sheet[cellRef] ? sheet[cellRef].v : null;

            // Filtrar las celdas vacías
            if (cell !== null && cell !== "") {
              if (cell === 1) {
                console.log("encontramos el numero que buscas");
              }
              rowData.push(cell);
            }
          }
          extractedData.push(rowData);
        }

        resolve(extractedData);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ExtractDataExcelService;
