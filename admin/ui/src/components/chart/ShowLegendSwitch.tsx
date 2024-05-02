import { Switch, SwitchOnChangeData } from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/estadisticas/EstadisticaFormSlice';

const ShowLegendSwitch = ({ chartIndex }) => {
  const dispath = useAppDispatch();
  const fieldName = 'mostrarLeyenda';
  let checked = useAppSelector(selectGraficoFieldValue(chartIndex, fieldName));
  if (checked === undefined) {
    checked = true;
  }
  const handleChange = (e, data: SwitchOnChangeData) => {
    dispath(
      setGraficoFieldValue({
        index: chartIndex,
        field: fieldName,
        value: data.checked,
      })
    );
  };
  return (
    <Switch label="Mostrar leyenda" onChange={handleChange} checked={checked} />
  );
};

export default ShowLegendSwitch;
