import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectEstadisticaData,
  selectEstadisticaDatos,
  selectEstadisticaIndicePath,
} from '../app/AppSlice';
import { Button } from '@fluentui/react-components';
import IndicadorDataGrid from '../../src/components/IndicadorDataGrid';
import { useRef } from 'react';

function TablaDatos() {
  const dataTable = useAppSelector(selectEstadisticaDatos);
  const data = useAppSelector(selectEstadisticaData);
  const compo = useAppSelector(selectComponenteIndicePath);
  const sub = useAppSelector(selectEstadisticaIndicePath);
  const { fuente, elaboracion, nota, nombre } = data?.datos || {}; //tabla

  const downloadAreaContainer = useRef(null);
  const base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));
  const format = (s, c) => {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p];
    });
  };

  const download = (element, name) => {
    const ctx = { worksheet: name || 'Hoja1', table: element.outerHTML };
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>{table}</body></html>';
    window.location.href = uri + base64(format(template, ctx));
  };
  const handleDowload = () => {
    download(downloadAreaContainer.current, 'descarga.xlsx');
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
        ref={downloadAreaContainer}
      >
        <IndicadorDataGrid data={dataTable.tabla} />
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
