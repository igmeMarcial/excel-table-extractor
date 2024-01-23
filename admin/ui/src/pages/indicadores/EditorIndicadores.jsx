import React, { useRef } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';
import Form from '../indicadores/Form';
import { makeStyles, Button } from '@fluentui/react-components';

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

function EditorIndicadores() {
  const styles = useStyles();

  const componente2Ref = useRef();

  const handleClick = () => {
    // Accede al botón del Componente 2 y simula un clic
    componente2Ref.current.click();
  };

  return (
    <MainLayout>
      <div className="border border-red flex flex-col h-full">
        <div className="bg-gray-100 px-12 pt-3 ">
          <h2 className="text-2xl md:text-2xl font-bold">
            Registrar Indicador
          </h2>
        </div>
        <div className="px-12 bg-gray-100  ">
          <nav className="bg-gray-100">
            <div className="container flex items-start justify-start py-4 mx-auto text-gray-600 capitalize dark:text-gray-300">
              <Link
                to="#"
                className="text-gray-800 dark:text-gray-800 border-b-2 border-blue-500 mx-1.5 sm:mx-3 sm:ml-0"
              >
                Fichas
              </Link>

              <Link
                to="#"
                className="text-gray-500 border-b-2 border-transparent hover:text-gray-800 dark:hover:border-blue-500 hover:border-blue-500 mx-1.5 sm:mx-3"
              >
                Datos
              </Link>
              <Link
                to="#"
                className="text-gray-500 border-b-2 border-transparent hover:text-gray-800 dark:hover:border-blue-500 hover:border-blue-500 mx-1.5 sm:mx-3"
              >
                Presentación
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex-1 h-full pl-12 b  overflow-auto scroll-container">
          <Form ref={componente2Ref} />
        </div>
        <div className="bg-gray-100  bottom-0 w-full pt-2 pb-2 px-12 ">
          <div className={styles.wrapper}>
            <Button
              className={styles.btn}
              appearance="primary"
              onClick={handleClick}
            >
              Guardar
            </Button>
            <Button className="" appearance="outline">
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditorIndicadores;
