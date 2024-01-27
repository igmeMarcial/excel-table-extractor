import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNewPathUrl } from '../hooks/usePathRoute';
const items = [
  { text: 'Fichas', path: 'indicadores/ficha' },
  { text: 'Datos', path: 'indicadores/datos' },
  { text: 'Presentación', path: 'indicadores/presentacion' },
];

function MenuIndicadores() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab');

  return (
    <div className="px-12 bg-custom-grey  ">
      <nav className="bg-custom-grey">
        <div className="container flex items-start justify-start pt-4 pb-2 mx-auto text-gray-600 capitalize dark:text-gray-300">
          {items.map((item) => (
            <Link
              key={item.path}
              to={getNewPathUrl(item.path)}
              className={`${
                currentTab === item.path
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
  );
}

export default MenuIndicadores;
