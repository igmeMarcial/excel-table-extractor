import { Button, makeStyles } from '@fluentui/react-components';
import {
  DataBarVertical24Regular,
  DataBarHorizontal24Regular,
  DataLine24Regular,
  DataArea24Regular,
  DataPie24Regular,
} from '@fluentui/react-icons';
import { useAppDispatch } from '../../../../app/hooks';
import { setTipoGrafico } from '../../EstadisticaFormSlice';
import { TipoGrafico } from '../../../../types/TipoGrafico';
const useStyles = makeStyles({
  active: { backgroundColor: '#E6E6E6' },
});

interface TipoGraficoSelectProps {
  tipoGrafico: TipoGrafico;
}

const TipoGraficoSelect = ({ tipoGrafico }: TipoGraficoSelectProps) => {
  const dispath = useAppDispatch();
  const classes = useStyles();

  const handleChange = (tipoGrafico: TipoGrafico) => {
    dispath(setTipoGrafico({ tipoGrafico, index: 0 }));
  };

  return (
    <div>
      <p>Tipo de gráfico</p>
      <div className="flex gap-3">
        <Button
          appearance="subtle"
          icon={<DataBarVertical24Regular />}
          onClick={() => handleChange('columnas')}
        />
        <Button
          appearance="subtle"
          icon={<DataBarHorizontal24Regular />}
          onClick={() => handleChange('barras')}
        />
        <Button
          className={tipoGrafico === 'lineas' ? classes.active : ''}
          appearance="subtle"
          icon={<DataLine24Regular />}
          onClick={() => handleChange('lineas')}
        />
        <Button
          appearance="subtle"
          icon={<DataArea24Regular />}
          onClick={() => handleChange('areas')}
        />
        <Button
          className={tipoGrafico === 'torta' ? classes.active : ''}
          appearance="subtle"
          icon={<DataPie24Regular />}
          onClick={() => handleChange('torta')}
        />
      </div>
    </div>
  );
};

export default TipoGraficoSelect;
