import React, { Dispatch, SetStateAction, useState } from 'react';
import FilesIndicadoresCell from './FilesIndicadoresCell';
import ExtractDataExcelService from '../../services/ExtractDataExcelService';

interface MultipleFileUploaderProps {
  setHasFiles:Dispatch<SetStateAction<boolean>>;
  hasFiles:boolean;
  onFiles:any;
}
const MultipleFileUploader: React.FC<MultipleFileUploaderProps> = ({
  setHasFiles,hasFiles,onFiles
}) => {

  const [cellValues, setCellValues] = useState(null);
  const extractDataExcelService = new ExtractDataExcelService();

  const handleFileChange = async (event) => {
   
    const archivos = [...event.target.files];
    try {
      const newCellValues = [];
      for (const file of archivos) {
        try {
          const workbook = await extractDataExcelService.readExcelFile(file);
          if (workbook) {
            const cellValueTitle =
              await extractDataExcelService.getNameIndicador(workbook, 1);
            newCellValues.push({ key: file.name, file: cellValueTitle });
          }
        } catch (err) {
          console.error('Error al leer el archivo Excel:', err);
        }
      }
      setCellValues(newCellValues);
      onFiles(archivos);
      setHasFiles(true)
    } catch (err) {
      console.error('Error al procesar los archivos:', err);
    }
  };

  return (
    <section className="h-full min-h-60 py-3  w-full items-center ">
      {hasFiles ? (
        <FilesIndicadoresCell arr={cellValues} />
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
};

export default MultipleFileUploader;
