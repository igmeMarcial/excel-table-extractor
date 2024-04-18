import BlockEditorHeader from '../../../../components/BlockEditorHeader';
import TableOptionsEditor from '../../../../components/table/TableOptionsEditor';
import {
  selectEstadisticaData,
  selectPresentacionTablaFieldValue,
} from '../../EstadisticaFormSlice';
import { useAppSelector } from '../../../../app/hooks';
import BlockTablaDatos from '../../../../public/components/BlockTablaDatos';

const SeccionTabla = () => {
  const data = useAppSelector(selectEstadisticaData);
  let decimals = useAppSelector(selectPresentacionTablaFieldValue('decimales'));
  return (
    <div className="border-2 border-solid border-blue-600 rounded">
      <BlockEditorHeader title="Tabla" style={{ background: '#2563eb' }} />
      <div className="flex">
        <div className="flex-1 overflow-hidden bg-gray-50">
          <div className="m-2 border border-solid border-gray-300 bg-white">
            <div>
              <BlockTablaDatos
                props={{
                  tabla: data,
                  nota: 'Tabla de datos de prueba',
                  fuente: 'MINAM',
                  titulo: 'Tabla de datos de prueba 2020-2024',
                }}
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
