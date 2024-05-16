import React from 'react';
import { Button } from '@fluentui/react-components';
import { fichaTecnicaFormatted } from '../../utils/file-utils';
import { BlockTablaEstadisticaDatos } from '../../types/BlockTablaEstadisticaDatos';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FichaTecnicaPdf } from '../../../src-frontpage/components/FichaTecnicaPdf';
import { PdfIcon } from '../../utils/Icons';
interface BlockFichaTecnicaProps {
  estadistica: BlockTablaEstadisticaDatos;
}

const renderValue = (fieldName, value) => {
  const formattedValue = value.replace(/\n/g, '<br>');
  const clickableValue = formattedValue.replace(
    /\b(https?:\/\/\S+)/gi,
    '<a href="$1" target="_blank">$1</a>'
  );

  return <span dangerouslySetInnerHTML={{ __html: clickableValue }} />;
};

export const BlockFichaTecnica: React.FC<BlockFichaTecnicaProps> = ({
  estadistica,
}) => {
  const dataFormatted = fichaTecnicaFormatted(estadistica);
  return (
    <div className="overflow-auto">
      <div id="downloadArea">
        <div className="relative my-1">
          {dataFormatted.map((item, rowIndex) => (
            <div
              className="indicadores mb-3 break-words"
              key={`row-${item.id}`}
            >
              <div className="text-custom-blue text-xs font-bold ">
                {item.key}
              </div>
              <div
                className="text-xs text-justify"
                style={{
                  fontWeight:
                    item.key === 'Nombre del indicador o estadística ambiental'
                      ? 'bold'
                      : 'normal',
                }}
              >
                {renderValue(item.key, item.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <PDFDownloadLink
          document={<FichaTecnicaPdf data={dataFormatted} />}
          fileName="fichaTecnica.pdf"
        >
          {({ loading, url, error, blob }) => (
            <Button icon={<PdfIcon />}>Descargar PDF</Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
