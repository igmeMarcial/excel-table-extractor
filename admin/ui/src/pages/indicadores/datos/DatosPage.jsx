import React, { useRef } from 'react';
import IndicadoresEditLayout from '../../../layout/IndicadoresEditLayout';
import MainLayout from '../../../layout/MainLayout';
import {
  ArrowImport24Regular,
  ArrowCurveDownLeft24Regular,
} from '@fluentui/react-icons';
import { makeStyles, Button } from '@fluentui/react-components';
import Form from '../ficha/Form';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../../hooks/usePathRoute';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
  btn: {
    backgroundColor: '#0F6CBD',
    ':hover': {
      backgroundColor: '#0d599b',
    },
  },
});

function DatosPage() {
  const styles = useStyles();
  const handleClick = () => {
    console.log('click en guardar datos');
  };
  return (
    <MainLayout>
      <div className="border border-red flex flex-col h-full">
        <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2">
          <h2 className="text-2xl md:text-2xl font-bold">Indicador</h2>
          <span className="flex-1"></span>
          <Button
            style={{ color: '#2271B1' }}
            appearance="subtle"
            icon={<ArrowImport24Regular />}
          >
            Actualizar desde ficha técnica
          </Button>
          <Button
            style={{ color: '#2271B1' }}
            appearance="subtle"
            icon={<ArrowCurveDownLeft24Regular style={{ color: '#DA3B01' }} />}
          >
            Descartar cambios
          </Button>
        </div>
        <div className="pt-2 pb-2 px-12 bg-custom-grey font-semibold text-sm">
          Text="Radiación ultravioleta, promedio mensual, anual y máximo mensual
          y anual en los Distritos de San Martin de Porres, Carabayllo, Ate
          (Ceres) de la Provincia de Lima, 2023 (IUV)";
        </div>
        <IndicadoresEditLayout>
          <div className="flex-1 h-full pl-12 b  overflow-auto scroll-container">
            Datos aqui
          </div>
        </IndicadoresEditLayout>
        <div className="bg-custom-grey bottom-0 w-full pt-2 pb-2 px-12 ">
          <div className={styles.wrapper}>
            <Button
              className={styles.btn}
              appearance="primary"
              onClick={handleClick}
              disabled
            >
              Guardar
            </Button>
            <Link to={getNewPathUrl('indicadores')}>
              <Button className="" appearance="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DatosPage;
