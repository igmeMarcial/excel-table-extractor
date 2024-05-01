import DataTable from '../../components/DataTable';
import { CodigoMarcoOrdenador } from '../../types/CodigoMarcoOrdenador';
import { Estadistica } from '../../types/Estadistica';
import { getContextoVisualColor } from '../../utils/color-utils';
import { removerTextoEntreParentesisDelFinal } from '../../utils/estadistica-utils';

interface BlockTablaDatosProps {
  contextoVisual: CodigoMarcoOrdenador;
  numeralNivel1: number;
  estadistica: Estadistica;
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

function BlockTablaDatos({
  estadistica,
  contextoVisual,
  numeralNivel1,
}: Readonly<BlockTablaDatosProps>) {
  const color = getContextoVisualColor(contextoVisual, numeralNivel1);
  const format = { ...estadistica.presentacionTablaFormato, color };
  const subtitulo = removerTextoEntreParentesisDelFinal(estadistica.unidadMedida);
  return (
    <>
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
          {removerTextoEntreParentesisDelFinal(estadistica.presentacionTablaTitulo)}
        </div>
        {subtitulo && <div>({subtitulo})</div>}
      </div>
      <DataTable data={estadistica.datos} format={format} />
      <div style={{ fontSize: FOOTER_FONT_SIZE, marginTop: '8px' }}>
        {renderNota(estadistica.presentacionTablaNota)}
        {renderFuente(estadistica.presentacionTablaFuente)}
        {renderElaboracion(estadistica.presentacionTablaElaboracion)}
      </div>
    </>
  );
}

export default BlockTablaDatos;
