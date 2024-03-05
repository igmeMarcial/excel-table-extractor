import TipoGraficoSelect from './TipoGraficoSelect';
import PresentationSeriesStacked from './PresentationSeriesStacked';
import PresentationSeriesConfiguration from './PresentationSeriesConfiguration';
import TipoApilamiento from './PresentationTipoApilamiento';
import { Grafico } from '../../../../types/Grafico';

interface GraficoToolbarProps {
  grficoIndex: number;
  grafico: Grafico;
}
const GraficoToolbar = ({ grafico }: GraficoToolbarProps) => {
  return (
    <div className="flex">
      <TipoGraficoSelect tipoGrafico={grafico.tipo} />
      <PresentationSeriesStacked />
      <TipoApilamiento />
      {/* <PresentationSeriesConfiguration /> */}
    </div>
  );
};

export default GraficoToolbar;
