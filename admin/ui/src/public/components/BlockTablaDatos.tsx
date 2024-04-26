import DataTable from '../../components/DataTable';
import { CodigoMarcoOrdenador } from '../../types/CodigoMarcoOrdenador';
import { Estadistica } from '../../types/Estadistica';
import { EstadisticaDatos } from '../../types/EstadisticaDatos';
import { getContextoVisualColor } from '../../utils/color-utils';
import {
  obtenerTextoEntreParentesis,
  quitarParentesis,
} from '../../utils/string-utils';

interface BlockTablaDatosProps {
  contextoVisual: CodigoMarcoOrdenador;
  numeralNivel1: number;
  props: EstadisticaDatos;
  estadistica: Estadistica;
}
// Tokens
const TITULO_FONT_SIZE = '12px';
const FOOTER_FONT_SIZE = '10px';

const renderNota = (nota: string) => {
  if (nota) {
    return (
      <div style={{ marginBottom: '4px' }}>
        Nota: <br />
        {nota}
      </div>
    );
  }
};

function BlockTablaDatos({
  estadistica,
  props,
  contextoVisual,
  numeralNivel1,
}: Readonly<BlockTablaDatosProps>) {
  const color = getContextoVisualColor(contextoVisual, numeralNivel1);
  const format = { ...props.formato, color };
  return (
    <>
      <div
        style={{
          fontSize: TITULO_FONT_SIZE,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        {quitarParentesis(estadistica.presentacionTablaTitulo)} <br />
        <span className="font-normal">
          {obtenerTextoEntreParentesis(props.titulo)}
        </span>
      </div>
      <DataTable data={props.tabla} format={format} />
      <div style={{ fontSize: FOOTER_FONT_SIZE, marginTop: '8px' }}>
        {renderNota(estadistica.presentacionTablaNota)}
        <div>Fuente: {estadistica.presentacionTablaFuente}</div>
      </div>
    </>
  );
}

export default BlockTablaDatos;
