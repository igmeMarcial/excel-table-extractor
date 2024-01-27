import React, { useRef } from 'react';
import IndicadoresEditLayout from '../../../layout/IndicadoresEditLayout';
import MainLayout from '../../../layout/MainLayout';
import { makeStyles, Button } from '@fluentui/react-components';
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

function PresentacionPage() {
  const styles = useStyles();
  const componente2Ref = useRef();
  const handleClick = () => {
    componente2Ref.current.click();
  };

  return (
    <MainLayout>
      <div className="border border-red flex flex-col h-full">
        <div className="bg-custom-grey flex px-12 pt-3 pb-3 gap-2">
          <h2 className="text-2xl md:text-2xl font-bold">Indicador</h2>
          <span className="flex-1"></span>
        </div>

        <IndicadoresEditLayout>
          <div className="flex-1 h-full pl-12 b  overflow-auto scroll-container"></div>
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

export default PresentacionPage;
