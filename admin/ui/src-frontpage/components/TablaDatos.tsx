import { Button } from '@fluentui/react-components';
import { CsvIcon, XlsxIcon } from './Icons';
import { useAppSelector } from '../app/hooks';
import {
  selectEstadisticaDatos,
  selectEstadisticaMarcoOrdenador,
} from '../app/AppSlice';
import { useRef } from 'react';
import BlockTablaDatos from '../../src/public/components/BlockTablaDatos';

const TablaDatos = () => {
  const datos = useAppSelector(selectEstadisticaDatos) || null;
  const marcoOrdenador =
    useAppSelector(selectEstadisticaMarcoOrdenador) || null;

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
  const downloadXlsx = () => {
    download(downloadAreaContainer.current, 'descarga.xlsx');
  };
  const downloadCsv = () => {
    const csvRows = datos.tabla.map((row) =>
      row.map((cell) => cell.v).join(',')
    );

    const csvContent = csvRows.join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'descarga.csv');
    document.body.appendChild(link);
    link.click();
  };
  if (!datos) {
    return <div className="pl-4 pt-4">No hay datos disponibles.</div>;
  }

  const numeralNivel1 = +marcoOrdenador?.numeral.split('.')[0];

  return (
    <>
      <div
        ref={downloadAreaContainer}
        className="mt-5"
        style={{ fontFamily: 'sans-serif' }}
      >
        <BlockTablaDatos
          props={datos}
          contextoVisual={marcoOrdenador.codigo}
          numeralNivel1={numeralNivel1}
        />
      </div>
      <div className="flex gap-4 justify-center mb-4">
        <Button onClick={() => downloadXlsx()} icon={<XlsxIcon />}>
          Descargar XLSX
        </Button>
        <Button onClick={() => downloadCsv()} icon={<CsvIcon />}>
          Descargar CSV
        </Button>
      </div>
    </>
  );
};
export default TablaDatos;
