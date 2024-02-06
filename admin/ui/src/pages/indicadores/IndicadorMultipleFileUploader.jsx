import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import FilesIndicadoresCell from './FilesIndicadoresCell';

const dataTest = [
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
  { file: 'arcivo1' },
];

function MultipleFileUploader({ onFileChange }) {
  const [files, setFiles] = useState(false);
  const [cellValues, setCellValues] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Convierte la colección de archivos en un array.
      const selectedFiles = Array.from(e.target.files);

      // Mapea cada archivo seleccionado a una promesa.
      const promises = selectedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          // Se ejecuta cuando el archivo se ha cargado.
          reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            // Obtiene el nombre de la primera hoja.
            const firstSheetName = workbook.SheetNames[0];
            const firstSheet = workbook.Sheets[firstSheetName];

            // Obtén el valor de la celda A2
            const cellA2 = firstSheet['A2'] ? firstSheet['A2'].v : null;
            resolve(cellA2);
          };
          // Lee el contenido del archivo como un array buffer.
          reader.readAsArrayBuffer(file);
        });
      });
      // Cuando se han completado todas las promesas, actualiza el estado.
      Promise.all(promises).then((values) => {
        const arr = values.map((fileName) => ({
          file: fileName,
          key: `${Date.now()} + ${fileName}`,
        }));
        setCellValues(arr);
        setFiles(true);
        onFileChange(files);
      });
    }
  };

  return (
    <section className="h-full min-h-60 py-3  w-full items-center ">
      {files ? (
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
}

export default MultipleFileUploader;
