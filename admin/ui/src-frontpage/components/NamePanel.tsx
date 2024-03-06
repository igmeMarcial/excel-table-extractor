import { Link, useLocation } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectIndiceEstadisticas,
} from '../app/AppSlice';

const NamePanel = () => {
  const location = useLocation();
  const indiceEstadisticas = useAppSelector(selectIndiceEstadisticas);
  const numItemActivo = useAppSelector(selectComponenteIndicePath);

 
  return (
    <div className="grid grid-cols-6 gap-4 my-10">
      {indiceEstadisticas.map((item) => (
        <Link
          key={item.numeracion}
          to={newPathUrl(location, 'estadistica', item.numeracion + '.1.1.1')}
          className="panel p-2 rounded-lg mb-4 h-20 sm:h-10 md:h-14 lg:h-18 xl:h-20 flex justify-center text-center items-center cursor-pointer no-underline"
          style={{
            background:
              numItemActivo === item.numeracion ? '#0071BC' : '#07C4EC',
          }}
        >
          <h4 className="font-normal text-white text-sm sm:text-sm md:text-base lg:text-base xl:text-base leading-tight xl:leading-4 lg:leading-4">
            {item.nombre}
          </h4>
        </Link>
      ))}
    </div>
  );
};

export default NamePanel;
