import { Button } from '@fluentui/react-components';
import { CsvIcon, XlsxIcon } from './Icons';
import { useAppSelector } from '../app/hooks';
import { selectEstadisticaDatos } from '../app/AppSlice';
import { useRef } from 'react';
import BlockTablaDatos from '../../src/public/components/BlockTablaDatos';

const TablaDatos = () => {
  const dataTable = useAppSelector(selectEstadisticaDatos);
  const { tabla } = dataTable.datos || {}; //tabla

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
    // const csvContent = tabla
    //   .map((row) => row.map((cell) => cell.v).join(','))
    //   .join('\n');

    // const csvData = tabla.map((row) => row.map((cell) => cell.v));
    // console.log(csvData);
    const csvData = tabla.map((row) => row.map((cell) => cell.v));

    // Convertir csvData en formato CSV
    const separator = ';'; // Separador de valores en CSV
    const csvContent = csvData.map((row) => row.join(separator)).join('\n');

    // Descargar el archivo CSV
    const filename = 'exported_data.csv'; // Nombre del archivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Crear el enlace de descarga y simular el clic para descargar el archivo
    //  const link = document.createElement('a');
    //  if (link.download !== undefined) {
    //    // Browsers que soportan el atributo 'download' de HTML5
    //    const url = URL.createObjectURL(blob);
    //    link.setAttribute('href', url);
    //    link.setAttribute('download', filename);
    //    link.style.visibility = 'hidden';
    //    document.body.appendChild(link);
    //    link.click();
    //    document.body.removeChild(link);
    //  } else if (navigator.msSaveBlob) {
    //    // Para IE 10+
    //    navigator.msSaveBlob(blob, filename);
    //  } else {
    //    // No se puede descargar el archivo
    //    console.error('Descarga de archivos no soportada en este navegador.');
    //  }
  };

  if (!dataTable?.tabla?.length) {
    return <div className="pl-4 pt-4">No hay datos disponibles.</div>;
  }

  return (
    <>
      <div
        ref={downloadAreaContainer}
        className="my-5"
        style={{ fontFamily: 'sans-serif' }}
      >
        <BlockTablaDatos props={dataTable} />
      </div>
      <div className="flex gap-4">
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
