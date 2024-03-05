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
  const isActive = (tipo: TipoGrafico) => {
    return tipoGrafico === tipo;
  };
  return (
    <div>
      <p>Tipo de gráfico</p>
      <div className="flex gap-3">
        <Button
          appearance="subtle"
          className={isActive('columnas') ? classes.active : ''}
          icon={<DataBarVertical24Regular />}
          onClick={() => handleChange('columnas')}
        />
        <Button
          appearance="subtle"
          className={isActive('barras') ? classes.active : ''}
          icon={<DataBarHorizontal24Regular />}
          onClick={() => handleChange('barras')}
        />
        <Button
          className={isActive('lineas') ? classes.active : ''}
          appearance="subtle"
          icon={<DataLine24Regular />}
          onClick={() => handleChange('lineas')}
        />
        <Button
          appearance="subtle"
          className={isActive('areas') ? classes.active : ''}
          icon={<DataArea24Regular />}
          onClick={() => handleChange('areas')}
        />
        <Button
          className={isActive('pie') ? classes.active : ''}
          appearance="subtle"
          icon={<DataPie24Regular />}
          onClick={() => handleChange('pie')}
        />
      </div>
    </div>
  );
};

export default TipoGraficoSelect;
