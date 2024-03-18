import TipoGraficoSelect from './TipoGraficoSelect';
import { DataUsageSettings20Regular } from '@fluentui/react-icons';
import { Grafico } from '../../../../types/Grafico';
import { Button } from '@fluentui/react-button';
import { Divider } from 'antd';
import GraficoSeriesConfigWindow from './GraficoSeriesConfigWindow';
import { useRef } from 'react';

interface GraficoToolbarProps {
  graficoIndex: number;
  grafico: Grafico;
}
const GraficoToolbar = ({ grafico }: GraficoToolbarProps) => {
  const seriesConfigWindowRef = useRef(null);
  const onConfigSeriesClick = () => {
    seriesConfigWindowRef.current.open();
  };
  return (
    <div className="flex items-center justify-start bg-gray-100 px-4 py-1">
      <TipoGraficoSelect tipoGrafico={grafico.tipo} />
      <Divider type="vertical" />
      <Button
        appearance="subtle"
        icon={<DataUsageSettings20Regular />}
        onClick={() => onConfigSeriesClick()}
      >
        Series
      </Button>
      <GraficoSeriesConfigWindow ref={seriesConfigWindowRef} />
    </div>
  );
};

export default GraficoToolbar;
