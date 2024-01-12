import React from 'react'
import MainLayout from '../layout/MainLayout'
import { Link } from 'react-router-dom'
import Form from '../components/Form';

function EditorIndicadores() {
  return (
    <MainLayout>
      <div className='p-6 h-4/5'>
        <div>
          <h2 className="text-2xl md:text-2xl font-bold">
            Registrar Indicador
          </h2>
        </div>
        <div>
          <nav className="bg-white  dark:bg-gray-800">
            <div className="container flex items-start justify-start py-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
              <Link
                to="#"
                className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-3"
              >
                Definición
              </Link>

              <Link
                to="#"
                className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-3"
              >
                Datos
              </Link>
              <Link
                to="#"
                className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-3"
              >
                Presentación
              </Link>
            </div>
          </nav>
        </div>
        <div>
            <Form/>
        </div>
        <div>

        </div>
      </div>
    </MainLayout>
  );
}

export default EditorIndicadores