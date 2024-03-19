import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectEstadisticaData,
  selectEstadisticaDatos,
  selectEstadisticaIndicePath,
} from '../app/AppSlice';
import { Button } from '@fluentui/react-components';
import IndicadorDataGrid from '../../src/components/DataTable';
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
    return <div className="pl-4 pt-4">No hay datos disponibles.</div>;
  }

  return (
    <div
      ref={downloadAreaContainer}
      className="my-5"
      style={{ fontFamily: 'sans-serif' }}
    >
      <div
        style={{ paddingRight: '110px' }}
        className="flex justify-around my-4 items-center px-4 relative"
      >
        <div className="absolute -top-2 right-0 text-xs">
          <Button
            onClick={handleDowload}
            style={{ color: '#217346', borderColor: '#217346' }}
          >
            Descargar
          </Button>
        </div>
        <div
          style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}
        >
          {nombre}
        </div>
      </div>
      <IndicadorDataGrid data={dataTable.tabla} />
      <div className="mt-2" style={{ fontSize: '10px' }}>
        Nota: <br />
        {nota}
      </div>
      <div className="mt-2" style={{ fontSize: '10px' }}>
        Fuente: {fuente}
      </div>
    </div>
  );
}
export default TablaDatos;
