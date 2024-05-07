import { Switch, SwitchOnChangeData } from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectGraficoFieldValue,
  setGraficoFieldValue,
} from '../../pages/estadisticas/EstadisticaFormSlice';

const ShowLabelsSwitch = ({ chartId }) => {
  const dispath = useAppDispatch();
  const fieldName = 'mostrarEtiquetas';
  let checked = useAppSelector(selectGraficoFieldValue(chartId, fieldName));
  if (checked === undefined) {
    checked = true;
  }
  const handleChange = (e, data: SwitchOnChangeData) => {
    dispath(
      setGraficoFieldValue({
        graficoId: chartId,
        field: fieldName,
        value: data.checked,
      })
    );
  };
  return (
    <Switch
      label="Mostrar etiquetas"
      onChange={handleChange}
      checked={checked}
    />
  );
};

export default ShowLabelsSwitch;
