import { useRef } from 'react';
import { WorkBook } from 'xlsx';
import { useAppSelector } from '../../../app/hooks';
import GetWorkbookButton from '../../../components/GetWorkbookButton';
import { EstadisticasWorkbook } from '../../../core/EstadisticasWorkbook';
import { selectIsCreationMode } from '../EstadisticaFormSlice';
import EstadisticaImportWindow, {
  EstadisticaImportWindowRef,
} from './EstadisticaImportWindow';

function IndicadorEditorHeaderImportButton() {
  const isCreationMode = useAppSelector(selectIsCreationMode);
  const importWindowRef = useRef<EstadisticaImportWindowRef>(null);
  const importButtonTitle = isCreationMode ? 'Importar' : 'Actualizar datos';
  const onWorkbookReady = (workBook: WorkBook) => {
    const wb = new EstadisticasWorkbook(workBook);
    importWindowRef.current?.open({ estadisticasWb: wb });
  };
  return (
    <>
      <GetWorkbookButton
        text={importButtonTitle}
        onWorkbookReady={onWorkbookReady}
      />
      <EstadisticaImportWindow ref={importWindowRef} />
    </>
  );
}

export default IndicadorEditorHeaderImportButton;
