import { Button, makeStyles } from '@fluentui/react-components';
import {
  DataBarVertical24Regular,
  DataBarHorizontal24Regular,
  DataLine24Regular,
  DataArea24Regular,
  DataPie24Regular,
} from '@fluentui/react-icons';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectTipoGrafico, setTipoGrafico } from '../../EstadisticaFormSlice';
import { TipoGrafico } from '../../../../types/TipoGrafico';
const useStyles = makeStyles({
  active: { backgroundColor: '#E6E6E6' },
});

const TipoGraficoSelect = () => {
  const dispath = useAppDispatch();
  const tipoGrafico = useAppSelector(selectTipoGrafico(0));
  const classes = useStyles();

  const handleChange = (tipoGrafico: TipoGrafico) => {
    dispath(setTipoGrafico({ tipoGrafico, index: 0 }));
  };

  return (
    <div>
      <p>Tipo de gráfico</p>
      <div className="flex gap-3">
        <Button
          className={tipoGrafico === 'verticalBar' ? classes.active : ''}
          appearance="subtle"
          icon={<DataBarVertical24Regular />}
          onClick={() => handleChange('bar')}
        />
        <Button
          className={tipoGrafico === 'horizontalBar' ? classes.active : ''}
          appearance="subtle"
          icon={<DataBarHorizontal24Regular />}
          onClick={() => handleChange('bar')}
        />
        <Button
          className={tipoGrafico === 'line' ? classes.active : ''}
          appearance="subtle"
          icon={<DataLine24Regular />}
          onClick={() => handleChange('line')}
        />
        <Button
          className={tipoGrafico === 'area' ? classes.active : ''}
          appearance="subtle"
          icon={<DataArea24Regular />}
          onClick={() => handleChange('line')}
        />
        <Button
          className={tipoGrafico === 'pie' ? classes.active : ''}
          appearance="subtle"
          icon={<DataPie24Regular />}
          onClick={() => handleChange('pie')}
        />
      </div>
    </div>
  );
};

export default TipoGraficoSelect;
