import React, { useRef } from 'react';
import IndicadoresEditLayout from '../../../layout/IndicadoresEditLayout';
import MainLayout from '../../../layout/MainLayout';
import {
  ArrowImport24Regular,
  ArrowCurveDownLeft24Regular,
} from '@fluentui/react-icons';
import { makeStyles, Button } from '@fluentui/react-components';
import Form from './Form';
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

function FichaPage() {
  const styles = useStyles();
  const componente2Ref = useRef();
  const handleClick = () => {
    componente2Ref.current.click();
  };

  return (
    <MainLayout>
      <div
        className="border border-red flex flex-col h-full"
        style={{ maxHeight: '570px' }}
      >
        <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2">
          <p className="text-2xl md:text-2xl font-bold p-0 m-1">Indicador</p>
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
        <div className=" px-12 bg-custom-grey font-semibold text-sm">
          Text="Radiación ultravioleta, promedio mensual, anual y máximo mensual
          y anual en los Distritos de San Martin de Porres, Carabayllo.
        </div>
        <IndicadoresEditLayout>
          <div className="flex-1 h-full pl-12 b  overflow-auto scroll-container ">
            <Form ref={componente2Ref} />
          </div>
        </IndicadoresEditLayout>
        <div className="bg-custom-grey bottom-0  pt-2 pb-2 px-12 ">
          <div className={styles.wrapper}>
            <Button
              className={styles.btn}
              appearance="primary"
              onClick={handleClick}
            >
              Guardar
            </Button>
            <Link to={getNewPathUrl('indicadores')}>
              <Button className="bg-white" appearance="outline">
                Cerrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default FichaPage;
