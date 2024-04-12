import ChartDataConfigWindow from './ChartDataConfigWindow';
import { DataUsageSettings20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
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
        Rango de datos
      </Button>
      <ChartDataConfigWindow
        ref={seriesConfigWindowRef}
        chartIndex={chartIndex}
      />
    </div>
  );
};

export default GraficoToolbar;
