import { useEffect } from 'react';
import ExtractDataExcelService from '../../../services/ExtractDataExcelService';
import { Checkbox } from 'antd';
import { WorkBook } from 'xlsx';
interface EditorSingleFileUploaderProps {
  onTableData?: any;
  onIndicatorData?: any;
  option1: boolean;
  setOption1: any;
  option2: boolean;
  setOption2: any;
  setFiles: any;
  titleIndicador: string;
  workBook: WorkBook;
  hasFile: boolean;
}
const EditorSingleFileUploader = ({
  onTableData,
  onIndicatorData,
  option1,
  setOption1,
  option2,
  setOption2,
  setFiles,
  titleIndicador,
  workBook,
  hasFile,
}: EditorSingleFileUploaderProps) => {
  const extractDataExcelService = new ExtractDataExcelService();
  useEffect(() => {
    setFiles(option1 || option2);
    if (workBook) {
      if (option1) {
        const dataIndicator =
          extractDataExcelService.getEstadisticaFieldsFichaTecnica(workBook, 1);
        onIndicatorData(dataIndicator);
      }
      if (option2) {
        const dataTable = extractDataExcelService.extractDataFromFile(
          workBook,
          0
        );
        onTableData(dataTable);
      }
    }
  }, [option1, option2]);
  return (
    <section className="h-full min-h-60 py-3  w-full items-center ">
      {hasFile && (
        <div>
          <p className="text-blue-500">Indicador detectado en la ficha</p>
          <div>{titleIndicador && <p>{titleIndicador}</p>}</div>
          <p className="text-blue-500">Selecciona los datos a importar</p>
          <div className="flex flex-col pl-4 gap-2 ">
            <Checkbox
              checked={option1}
              onChange={() => setOption1((checked) => !checked)}
            >
              Campos de ficha técnica
            </Checkbox>
            <Checkbox
              checked={option2}
              onChange={() => setOption2((checked) => !checked)}
            >
              Datos estadísticos
            </Checkbox>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditorSingleFileUploader;
