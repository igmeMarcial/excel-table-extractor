import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectEstadisticaData,
  selectEstadisticaDatos,
  selectEstadisticaIndicePath,
} from '../app/AppSlice';
import TableDataGrid from './TableDataGrid';
import { Button } from '@fluentui/react-components';
import * as XLSX from 'xlsx';

function TablaDatos() {
  const dataTable = useAppSelector(selectEstadisticaDatos);
  const data = useAppSelector(selectEstadisticaData);
  const compo = useAppSelector(selectComponenteIndicePath);
  const sub = useAppSelector(selectEstadisticaIndicePath);
  const { fuente, elaboracion, nota, nombre, tabla } = data?.datos || {};

  console.log(data);
  console.log(compo);
  console.log(sub);

  const handleDowload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(tabla);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'miFile1');
    XLSX.writeFile(workbook, 'descarga.xlsx');
  };

  if (!dataTable?.tabla?.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div className="w-full relative">
      <div className="flex justify-around mb-2 items-center px-4">
        <div className="text-center mx-auto">
          {nombre && (
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {nombre}
            </h4>
          )}
        </div>
        <Button onClick={handleDowload}>Descargar</Button>
      </div>
      <div
        className="w-full"
        style={{
          maxHeight: '600px',
          scrollbarWidth: 'thin',
          overflowX: 'auto',
        }}
      >
        <TableDataGrid data={dataTable.tabla} />
      </div>
      <div className="my-2 text-xs">
        <div>
          {fuente && <p className="inline text-xs">Fuente: </p>}
          {fuente && <p className="inline">{fuente}</p>}
        </div>
        <div>
          {elaboracion && <p className="inline">Elaboración: </p>}
          {elaboracion && <p className="inline">{elaboracion}</p>}
        </div>
        <div>
          {nota && <p className="inline">Nota: </p>}
          {nota && <p className="inline">{nota}</p>}
        </div>
      </div>
    </div>
  );
}
export default TablaDatos;
