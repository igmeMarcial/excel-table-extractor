import BlockEditorHeader from '../../../../components/BlockEditorHeader';
import TableOptionsEditor from '../../../../components/table/TableOptionsEditor';
import { selectEstadisticaValues } from '../../EstadisticaFormSlice';
import { useAppSelector } from '../../../../app/hooks';
import BlockTablaDatos from '../../../../public/components/BlockTablaDatos';

const SeccionTabla = () => {
  const estadistica = useAppSelector(selectEstadisticaValues);
  return (
    <div className="border-2 border-solid border-blue-600 rounded">
      <BlockEditorHeader title="Tabla" style={{ background: '#2563eb' }} />
      <div className="flex">
        <div className="flex-1 overflow-hidden bg-gray-50">
          <div className="m-2 border border-solid border-gray-300 bg-white">
            <div>
              <BlockTablaDatos
                estadistica={estadistica}
                contextoVisual="mdea"
                numeralNivel1={1}
              />
            </div>
          </div>
        </div>
        <TableOptionsEditor />
      </div>
    </div>
  );
};

export default SeccionTabla;
