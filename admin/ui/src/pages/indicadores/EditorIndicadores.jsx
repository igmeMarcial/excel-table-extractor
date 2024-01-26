import React, { useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';
import Form from '../indicadores/Form';
import { makeStyles, Button } from '@fluentui/react-components';
import { getNewPathUrl } from '../../hooks/usePathRoute';
import Datos from './Datos';
import {
  ArrowImport24Regular,
  ArrowCurveDownLeft24Regular,
} from '@fluentui/react-icons';

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

const items = [
  { text: 'Fichas', path: 'fichas' },
  { text: 'Datos', path: 'datos' },
  { text: 'Presentación', path: 'presentacion' },
];

function EditorIndicadores() {
  const [isDataComponent, setIsDataComponent] = useState(false);
  const [activeLink, setActiveLink] = useState('fichas');
  const styles = useStyles();
  const componente2Ref = useRef();
  const handleClick = () => {
    componente2Ref.current.click();
  };
  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsDataComponent(true);
  };

  return (
    <MainLayout>
      <div className="border border-red flex flex-col h-full">
        <div className="bg-gray-100 flex px-12 pt-4 pb-4 gap-2">
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
        <div className="pt-4 pb-4 px-12 bg-gray-100 font-semibold">
          Text="Radiación ultravioleta, promedio mensual, anual y máximo mensual
          y anual en los Distritos de San Martin de Porres, Carabayllo, Ate
          (Ceres) de la Provincia de Lima, 2023 (IUV)";
        </div>
        <div className="px-12 bg-gray-100  ">
          <nav className="bg-gray-100">
            <div className="container flex items-start justify-start pt-4 pb-2 mx-auto text-gray-600 capitalize dark:text-gray-300">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={getNewPathUrl(item.path)}
                  onClick={() => handleLinkClick(item.path)}
                  className={`${
                    activeLink === item.path
                      ? 'text-black font-semibold dark:text-gray-800 border-b-4 border-blue-400 pb-1'
                      : 'text-gray-500'
                  } mx-1.5 sm:mx-3 sm:ml-0`}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex-1 h-full pl-12 b  overflow-auto scroll-container">
          {isDataComponent ? <Datos /> : <Form ref={componente2Ref} />}
        </div>
        <div className="bg-gray-100  bottom-0 w-full pt-2 pb-2 px-12 ">
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
                Cerrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditorIndicadores;
