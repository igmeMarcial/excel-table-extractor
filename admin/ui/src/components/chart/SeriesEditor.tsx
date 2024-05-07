import ChartDataConfigWindow from './ChartDataConfigWindow';
import { DataUsageSettings20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectGraficoFieldValue } from '../../pages/estadisticas/EstadisticaFormSlice';

interface GraficoToolbarProps {
  chartId: number;
}
const GraficoToolbar = ({ chartId }: GraficoToolbarProps) => {
  let referencias = useAppSelector(
    selectGraficoFieldValue(chartId, 'referenciasTablaDatos')
  );
  const seriesConfigWindowRef = useRef(null);
  const onConfigSeriesClick = () => {
    seriesConfigWindowRef.current.open(referencias);
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
      <ChartDataConfigWindow ref={seriesConfigWindowRef} chartId={chartId} />
    </div>
  );
};

export default GraficoToolbar;
