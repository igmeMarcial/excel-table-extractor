import * as XLSX from 'xlsx';
import { BlockTablaEstadisticaDatos } from '../types/BlockTablaEstadisticaDatos';
import { apiMap } from '../../src-frontpage/components/FichaTecnicaMap';
import { FichaTecnicaFields } from '../types/Estadistica';

export const readExcelFile = (file: File): Promise<XLSX.WorkBook> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        resolve(workbook);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error: ProgressEvent<FileReader>) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};
//Section Downloads
export const downloadXlsx = (element: HTMLElement, name: string) => {
  const base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));
  const format = (s, c) => {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p];
    });
  };
  const ctx = { worksheet: name || 'Hoja1', table: element.outerHTML };
  const uri = 'data:application/vnd.ms-excel;base64,';
  const template =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>{table}</body></html>';
  window.location.href = uri + base64(format(template, ctx));
};
export const downloadCsv = (estadistica:BlockTablaEstadisticaDatos) => {
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

    const saveAs = (blob, fileName) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

    saveAs(blob, fileName);
};

export const fichaTecnicaFormatted = (data:FichaTecnicaFields)=>{
   if (!data || typeof data !== 'object') {
      return;
    }
     //Campos que se mostraran en el front
    const newArrNecessary = {
      nombre: data?.nombre,
      finalidad: data?.finalidad,
      descripcion: data?.descripcion,
      unidadMedida: data?.unidadMedida,
      formulaCalculo: data?.formulaCalculo,
      metodologiaCalculo: data?.metodologiaCalculo,
      fuente: data?.fuente,
      unidadOrganicaGeneradora: data?.unidadOrganicaGeneradora,
      ambitoGeografico: data?.ambitoGeografico,
      limitaciones: data?.limitaciones,
    };

     const filteredEntries = Object.entries(newArrNecessary).filter(
      ([_, value]) => typeof value === 'string'
    );
    const formattedData = filteredEntries.map(([key, value], index) => ({
      id: index + 1,
      key: apiMap[key],
      value: value,
    }));
    return formattedData;
}

 
