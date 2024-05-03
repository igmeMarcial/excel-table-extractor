import { useRef } from 'react';
import { WorkBook } from 'xlsx';
import GetWorkbookButton from '../../components/GetWorkbookButton';
import { EstadisticasWorkbook } from '../../core/EstadisticasWorkbook';
import EstadisticaMultipleImportWindow, {
  EstadisticaMultipleImportWindowRef,
} from './EstadisticaMultipleImportWindow';

function EstadisticasPageToolbarImportButton() {
  const importWindowRef = useRef<EstadisticaMultipleImportWindowRef>(null);
  const onWorkbookReady = (workBook: WorkBook) => {
    const wb = new EstadisticasWorkbook(workBook);
    importWindowRef.current?.open({ estadisticasWb: wb });
  };
  return (
    <>
      <GetWorkbookButton text="Importar" onWorkbookReady={onWorkbookReady} />
      <EstadisticaMultipleImportWindow ref={importWindowRef} />
    </>
  );
}

export default EstadisticasPageToolbarImportButton;
