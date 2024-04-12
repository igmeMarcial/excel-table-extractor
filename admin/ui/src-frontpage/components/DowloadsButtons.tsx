import React from 'react';
import { Button } from '@fluentui/react-components';
import { CsvIcon, DataIcon, PdfIcon, XlsxIcon } from './Icons';
export default function DowloadsButtons({ onDownload }) {
  return (
    <div className="flex gap-2 my-6">
      <Button onClick={() => onDownload('pdf')} icon={<PdfIcon />}>
        Descargar PDF
      </Button>
      <Button onClick={() => onDownload('xlsx')} icon={<XlsxIcon />}>
        Descargar XLSX
      </Button>
      <Button onClick={() => onDownload('csv')} icon={<CsvIcon />}>
        Descargar CSV
      </Button>
      <Button onClick={() => onDownload('data')} icon={<DataIcon />}>
        Descargar data
      </Button>
    </div>
  );
}
