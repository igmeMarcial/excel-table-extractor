import DataTable from '../../components/DataTable';
import { TablaDatosProps } from '../types/TablaDatosProps';

interface BlockTablaDatosProps {
  props: TablaDatosProps;
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

function BlockTablaDatos({ props }: Readonly<BlockTablaDatosProps>) {
  return (
    <>
      <div
        style={{
          fontSize: TITULO_FONT_SIZE,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        {props.titulo}
      </div>
      <DataTable data={props.tabla} format={{ color: 'orange' }} />
      <div style={{ fontSize: FOOTER_FONT_SIZE, marginTop: '8px' }}>
        {renderNota(props.nota)}
        <div>Fuente: {props.fuente}</div>
      </div>
    </>
  );
}

export default BlockTablaDatos;
