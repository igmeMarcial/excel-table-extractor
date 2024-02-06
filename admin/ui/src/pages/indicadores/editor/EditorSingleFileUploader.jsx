import React, { useState } from 'react';
import ExtractDataExcelService from '../../../services/ExtractDataExcelService';

function EditorSingleFileUploader() {
  const [loadingFile, setLoadingFile] = useState(false);
  const [files, setFiles] = useState(false);
  const [cellValues, setCellValues] = useState(null);
  const [title, setTitle] = useState('');

  const extractDataExcelService = new ExtractDataExcelService();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    try {
      const workbook = await extractDataExcelService.readExcelFile(
        selectedFile
      );
      console.log('Workbook:', workbook);
      setLoadingFile(true);
      if (workbook) {
        // Obtener todos los nombres de las hojas
        const sheetNames = await extractDataExcelService.getAllSheetNames(
          selectedFile
        );
        console.log('Nombres de las hojas:', sheetNames);
        const cellVallueTitle = await extractDataExcelService.getNameIndicador(
          workbook,
          3
        );
        console.log('Valor de la celda D5:', cellVallueTitle);
        setTitle(cellVallueTitle);
      }
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
    }
  };
  return (
    <section className="h-full min-h-60 py-3  w-full items-center ">
      {loadingFile ? (
        <div>{title && title}</div>
      ) : (
        <main
          style={{ borderColor: '#0F6CBD', backgroundColor: '#F6F7F7' }}
          className="h-full min-h-44  border-dotted border-2 rounded-md  py-12 flex flex-col justify-center items-center"
        >
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>
              Arrastré y suelte aquí las fichas de los indicadores o haga clic
              en “seleccionar fichas técnicas”
            </span>
            &nbsp;<span></span>
          </p>
          <label>
            <input
              id="hidden-input"
              className="text-sm cursor-pointer  hidden"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              multiple
            />
            <div
              style={{ borderRadius: '4px' }}
              className=" cursor-pointer  rounded-sm px-3 py-1 bg-white hover:bg-gray-300 focus:shadow-outline focus:outline-none font-semibold border-2 border-gray-300"
            >
              Seleccionar fichas técnicas
            </div>
          </label>
        </main>
      )}
    </section>
  );
}

export default EditorSingleFileUploader;
