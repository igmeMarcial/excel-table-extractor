import BlockEditorHeader from '../../../../components/BlockEditorHeader';
import TableOptionsEditor from '../../../../components/table/TableOptionsEditor';
import DataTable from '../../../../components/DataTable';
import {
  selectEstadisticaData,
  selectPresentacionTablaFieldValue,
} from '../../EstadisticaFormSlice';
import { useAppSelector } from '../../../../app/hooks';

const SeccionTabla = () => {
  const data = useAppSelector(selectEstadisticaData);
  let decimals = useAppSelector(selectPresentacionTablaFieldValue('decimales'));
  return (
    <div className="border-2 border-solid border-blue-600 rounded">
      <BlockEditorHeader title="Tabla" style={{ background: '#2563eb' }} />
      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <div className="m-2 border rounded border-dashed border-gray-500 p-2">
            <div>
              <DataTable data={data} format={{ color: 'gray', decimals }} />
            </div>
          </div>
        </div>
        <TableOptionsEditor />
      </div>
    </div>
  );
};

export default SeccionTabla;
