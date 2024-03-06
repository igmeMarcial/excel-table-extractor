import { useAppSelector } from '../app/hooks';
import { selectEstadisticaDatos } from '../app/AppSlice';
import TableDataGrid from './TableDataGrid';
import { Button } from '@fluentui/react-components';
import * as XLSX from 'xlsx';

function TablaDatos() {
  const data = useAppSelector(selectEstadisticaDatos);
  const { fuente, elaboracion, nota, nombre, tabla } = data || {};

  console.log(data)
  
  const handleDowload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(tabla);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'miFile1');
    XLSX.writeFile(workbook, 'descarga.xlsx');
  };

  if (!data?.tabla?.length) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div>
      <div className="flex justify-around mb-2 items-center">
        {nombre && <h4 className="text-sm font-bold text-center">{nombre}</h4>}
        {/* <div>
          <a
          href="#"
          className="hover:bg-green-700 cursor-pointer  text-green-800 px-4 py-3 flex justify-center items-center underline"
        >
          <img
            alt="excel"
            className="h-4"
            src="https://sinia.minam.gob.pe/inea/wp-content/plugins/inea-divi-extension/media/svg/microsoftexcel.svg"
          />
          <span className="ml-1">Descargar</span>
        </a>
        </div> */}
        <Button onClick={handleDowload}>Descargar</Button>
      </div>
      <div
        className="overflow-auto w-ful relative"
        style={{ maxHeight: '600px', scrollbarWidth: 'thin' }}
      >
        <TableDataGrid data={data.tabla} />
      </div>
      <div className="my-2 text-xs">
        <div>
          {fuente && <p className="inline text-xs">Fuente:</p>}
          {fuente && <p className="inline">{fuente}</p>}
        </div>
        <div>
          {elaboracion && <p className="inline">Elaboración:</p>}
          {elaboracion && <p className="inline">{elaboracion}</p>}
        </div>
        <div>
          {nota && <p className="inline">Nota:</p>}
          {nota && <p className="inline">{nota}</p>}
        </div>
      </div>
    </div>
  );
}
export default TablaDatos;
