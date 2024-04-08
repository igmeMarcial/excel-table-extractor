import TipoGraficoSelect from './ChartTypeSelect';
import { DataUsageSettings20Regular } from '@fluentui/react-icons';
import { Grafico } from '../../types/Grafico';
import { Button } from '@fluentui/react-button';
import { Divider } from 'antd';
import GraficoSeriesConfigWindow from '../../pages/indicadores/editor/presentacion/GraficoSeriesConfigWindow';
import { useRef } from 'react';

interface GraficoToolbarProps {
  chartIndex: number;
}
const GraficoToolbar = ({ chartIndex }: GraficoToolbarProps) => {
  const seriesConfigWindowRef = useRef(null);
  const onConfigSeriesClick = () => {
    seriesConfigWindowRef.current.open();
  };
  return (
    <div>
      <Button
        appearance="subtle"
        icon={<DataUsageSettings20Regular />}
        onClick={() => onConfigSeriesClick()}
      >
        Series
      </Button>
      <GraficoSeriesConfigWindow
        ref={seriesConfigWindowRef}
        chartIndex={chartIndex}
      />
    </div>
  );
};

export default GraficoToolbar;
