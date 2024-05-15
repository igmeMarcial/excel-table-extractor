import { Button } from '@fluentui/react-components';
import { CsvIcon, XlsxIcon } from './Icons';
import { useAppSelector } from '../app/hooks';
import {
  selectEstadisticaData,
  selectEstadisticaMarcoOrdenador,
} from '../app/AppSlice';
import { useRef } from 'react';
import BlockTabla from '../../src/public/components/BlockTabla';
import { BlockTablaEstadisticaDatos } from '../../src/types/BlockTablaEstadisticaDatos';

const TablaDatos = () => {
  const estadistica = useAppSelector(selectEstadisticaData) || null;
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
    const datosMatrix = estadistica.datos;
    // Convierte cada fila de datos en una cadena CSV
    const csvRows = datosMatrix.map((row) =>
      row.map((cell) => cell.v).join(',')
    );
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const fileName = `datos-${new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}.csv`;
    saveAs(blob, fileName);
  };
  const saveAs = (blob, fileName) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  if (!estadistica.datos) {
    return <div className="pl-4 pt-4">No hay datos disponibles.</div>;
  }

  const numeralNivel1 = +marcoOrdenador?.numeral.split('.')[0];
  return (
    <>
      <div ref={downloadAreaContainer} style={{ fontFamily: 'sans-serif' }}>
        <BlockTabla
          estadistica={estadistica as BlockTablaEstadisticaDatos}
          contextoVisual={marcoOrdenador.codigo}
          numeralNivel1={numeralNivel1}
        />
      </div>
      {estadistica.datos && estadistica.datos.length > 0 && (
        <div className="flex gap-4 mt-2">
          <Button onClick={() => downloadXlsx()} icon={<XlsxIcon />}>
            Descargar XLSX
          </Button>
          <Button onClick={() => downloadCsv()} icon={<CsvIcon />}>
            Descargar CSV
          </Button>
        </div>
      )}
    </>
  );
};
export default TablaDatos;
