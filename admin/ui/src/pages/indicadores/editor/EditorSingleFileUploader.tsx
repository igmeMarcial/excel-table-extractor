import React, { useEffect, useState } from 'react';
import ExtractDataExcelService from '../../../services/ExtractDataExcelService';
import { Checkbox } from '@fluentui/react-components';

interface EditorSingleFileUploaderProps{
  onTableData?: any,
  onIndicatorData?: any,
  uploadFile:boolean,
  setUploadFile:any,
 option1: boolean,
  setOption1: any,
  option2: boolean,
  setOption2: any,
  setFiles:any
}
const  EditorSingleFileUploader: React.FC<EditorSingleFileUploaderProps> =({uploadFile,setUploadFile,onTableData,onIndicatorData,option1,
  setOption1,
  option2,
  setOption2, setFiles}) =>{
  const [workbookFile, setWorkBookFile] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  
  const extractDataExcelService = new ExtractDataExcelService();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    try {
      const workbook = await extractDataExcelService.readExcelFile(
        selectedFile
      );
      setUploadFile(true)
      setWorkBookFile(workbook);
      if (workbook) {
        // Obtener todos los nombres de las hojas
        const sheetNames = await extractDataExcelService.getAllSheetNames(
          selectedFile
        );
        //Valor de la hoja 3 estaticamente de celda definido estaticamente
        const cellVallueTitle = await extractDataExcelService.getNameIndicador(
          workbook,
          1
        );
        setTitle(cellVallueTitle);
      }
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
    }
  };
  useEffect(() => {
    setFiles(option1 || option2);
    if (workbookFile) {
      if (option1) {
        extractDataExcelService
          .extractIndicatortechnicalSheet(workbookFile, 1)
          .then((extractedData) => {
            onIndicatorData(extractedData)
           
          })
          .catch((error) => {
            console.error(
              'Error al extraer datos de la hoja de indicadores técnicos:',
              error
            );
          });
      }
      if (option2) {
        extractDataExcelService
          .extractDataFromFile(workbookFile, 0)
          .then((extractedData) => {
            onTableData(extractedData);
          })
          .catch((error) => {
            console.error(
              'Error al extraer datos de la hoja de datos estadísticos:',
              error
            );
          });
      }
    }
  }, [option1, option2]);
  return (
    <section className="h-full min-h-60 py-3  w-full items-center ">
      {uploadFile ? (
        <div>
          <p className="text-blue-500">Indicador detectado en la ficha</p>
          <div>{title && <p>{title}</p>}</div>
          <p className="text-blue-500">Selecciona los datos a importar</p>
          <div className="flex flex-col pl-4 gap-2 ">
            <Checkbox
              checked={option1}
              onChange={() => setOption1((checked) => !checked)}
              label="Campos de ficha técnica"
            />
            <Checkbox
              checked={option2}
              onChange={() => setOption2((checked) => !checked)}
              label="Datos estadísticos"
            />
          </div>
        </div>
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
