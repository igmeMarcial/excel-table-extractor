import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ExtractDataExcelService from '../../services/ExtractDataExcelService';
function ExtractDataTest() {
  const [fileData, setFileData] = useState(null);
  const [tableData, setTableData] = useState(null);

  //Varibale para seleccionar de que hoja se va estraer el dato example: sheet2
  let hoja = 2;
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      const excelService = new ExtractDataExcelService();

      const { sheetData, tableData } = await excelService.extractDataFromFile(
        file,
        hoja
      );

      // Obtener todos los nombres de las hojas
      const sheetNames = await excelService.getAllSheetNames(file);
      console.log('Nombres de las hojas:', sheetNames);

      // Actualizar el estado con los datos obtenidos
      setFileData(sheetData);
      setTableData(tableData);

      // Haz algo más si es necesario
      console.log('Datos de la hoja:', sheetData);
      console.log('Datos de la tabla:', tableData);
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
      alert('No existe la hoja o hay un problema al obtener datos.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {tableData && (
        <div>
          <h2>Datos de la tabla</h2>
          {/* Renderizar los datos de la tabla en el componente */}
          <pre>{JSON.stringify(tableData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ExtractDataTest;
