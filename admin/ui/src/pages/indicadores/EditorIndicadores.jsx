import React from 'react'
import MainLayout from '../../layout/MainLayout'
import { Link } from 'react-router-dom'
import Form from '../indicadores/Form';

function EditorIndicadores() {
  
  return (
    <MainLayout>
      <div className="flex flex-col min-h-full ">
        <div className="bg-gray-100 px-12">
          <h2 className="text-2xl md:text-2xl font-bold">
            Registrar Indicador
          </h2>
        </div>
        <div className="px-12 bg-gray-100">
          <nav className="bg-gray-100">
            <div className="container flex items-start justify-start py-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
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
        <div className="flex-grow pl-12">
          <Form />
        </div>
        <div className="bg-gray-100 h-10 bottom-0 w-full  px-12">
          <button style={{"backgroundColor":"#0F6CBD"}} className="text-white font-bold py-2 px-3 rounded">
            Guardar
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditorIndicadores