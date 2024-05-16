import { useRef } from 'react';
import DataTable from '../../components/DataTable';
import { Button } from '@fluentui/react-components';
import { BlockTablaEstadisticaDatos } from '../../types/BlockTablaEstadisticaDatos';
import { CodigoMarcoOrdenador } from '../../types/CodigoMarcoOrdenador';
import { getContextoVisualColor } from '../../utils/color-utils';
import {
  determinarTituloTablaDatosDefecto,
  removerTextoEntreParentesisDelFinal,
} from '../../utils/estadistica-utils';
import { downloadCsv, downloadXlsx } from '../../utils/file-utils';
import { CsvIcon, XlsxIcon } from '../../utils/Icons';

interface BlockTablaProps {
  contextoVisual: CodigoMarcoOrdenador;
  numeralNivel1: number;
  estadistica: BlockTablaEstadisticaDatos;
}
// Tokens
const TITULO_FONT_SIZE = '12px';
const FOOTER_FONT_SIZE = '10px';

const renderFootField = (field, text) => {
  text = (text || '').trim();
  // Si contiene saltos de línea, añadir <br /> al principio, si aún no hay
  if (/\n/.test(text) && !text.startsWith('<br')) {
    text = '<br />' + text;
  }
  // Añadir <br /> si hay saltos de línea
  text = text.replace(/\n/g, '<br />');
  if (text) {
    return (
      <div style={{ marginBottom: '4px' }}>
        <b>{field}:</b> <span dangerouslySetInnerHTML={{ __html: text }}></span>
      </div>
    );
  }
};
const renderNota = (nota: string) => {
  nota = (nota || '').trim();
  // Si empieza con \w*\/, añadir <br /> si no hay
  if (/^\w*\//.test(nota)) {
    nota = '<br />' + nota;
  }
  return renderFootField('Nota', nota);
};
const renderElaboracion = (text: string) => {
  return renderFootField('Elaboración', text);
};
const renderFuente = (text: string) => {
  return renderFootField('Fuente', text);
};

function BlockTabla({
  estadistica,
  contextoVisual,
  numeralNivel1,
}: Readonly<BlockTablaProps>) {
  const color = getContextoVisualColor(contextoVisual, numeralNivel1);
  const format = { ...estadistica.presentacionTablaFormato, color };
  const downloadAreaContainer = useRef(null);
  const titulo =
    removerTextoEntreParentesisDelFinal(estadistica.presentacionTablaTitulo) ||
    determinarTituloTablaDatosDefecto(
      estadistica.nombre,
      estadistica.periodoSerieTiempo
    );
  const subtitulo = removerTextoEntreParentesisDelFinal(
    estadistica.unidadMedida
  );
  return (
    <>
      <div ref={downloadAreaContainer} style={{ fontFamily: 'sans-serif' }}>
        <div
          style={{
            fontSize: TITULO_FONT_SIZE,
            marginBottom: '12px',
            lineHeight: 1,
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              marginTop: '4px',
              marginBottom: '4px',
            }}
          >
            {titulo}
          </div>
          {subtitulo && <div>({subtitulo})</div>}
        </div>
        <DataTable data={estadistica.datos} format={format} />
        <div style={{ fontSize: FOOTER_FONT_SIZE, marginTop: '8px' }}>
          {renderNota(estadistica.presentacionTablaNota)}
          {renderFuente(estadistica.presentacionTablaFuente)}
          {renderElaboracion(estadistica.presentacionTablaElaboracion)}
        </div>
      </div>
      {estadistica.datos && estadistica.datos.length > 0 && (
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() =>
              downloadXlsx(downloadAreaContainer.current, 'descarga.xlsx')
            }
            icon={<XlsxIcon />}
          >
            Descargar XLSX
          </Button>
          <Button onClick={() => downloadCsv(estadistica)} icon={<CsvIcon />}>
            Descargar CSV
          </Button>
        </div>
      )}
    </>
  );
}

export default BlockTabla;
