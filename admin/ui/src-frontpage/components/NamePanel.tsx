import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { useAppSelector } from '../app/hooks';
import { selectIndiceEstadisticas } from '../app/AppSlice';

// const namePanels = [
//   { id: 1, name: 'Condiciones y Calidad Ambiental', color: '#0071BC' },
//   { id: 2, name: 'Recursos Ambientales y su Uso', color: '#07C4EC' },
//   { id: 3, name: 'Residuos', color: '#07C4EC' },
//   { id: 4, name: 'Eventos Extremos y Desastres', color: '#07C4EC' },
//   { id: 5, name: 'Asentamientos Humanos y Salud Ambiental', color: '#07C4EC' },
//   { id: 6, name: 'Protección, Gestión y Conciencia Ambiental', color: '#07C4EC' },
// ];

const NamePanel = () => {
  const location = useLocation();
  const resourceId = getQueryParam(location, 'cid');
const estadisticas = useAppSelector(selectIndiceEstadisticas)



  return (
    <div className="grid grid-cols-6 gap-4 my-10">
      {estadisticas.map((panel, index) => ( 
        <Link
        key={index}
        to={newPathUrl(location,'cid',panel.id)}
          className="panel p-2 rounded-lg mb-4 h-20 sm:h-10 md:h-14 lg:h-18 xl:h-20 flex justify-center text-center items-center cursor-pointer no-underline"
            style={{ background: resourceId === panel.id.toString() ? '#0071BC' : '#07C4EC' }}
        >
          <h4 className="font-normal text-white text-sm sm:text-sm md:text-base lg:text-base xl:text-base leading-tight">
            {panel.nombre}
          </h4>
        </Link>
      ))}
    </div>
  );
};

export default NamePanel;
