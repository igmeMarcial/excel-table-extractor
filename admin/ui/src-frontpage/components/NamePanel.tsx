import { Link, useLocation } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectClasificadoresNivel1,
} from '../app/AppSlice';
import { IndiceItem } from '../types/IndiceItem';
function NavItem(item: IndiceItem, location, numItemActivo: any) {
  return (
    <Link
      key={item.numeral}
      to={newPathUrl(location, 'estadistica', item.numeral + '.1.1.1')}
      className="panel p-2 rounded-lg mb-4 h-20 sm:h-10 md:h-14 lg:h-18 xl:h-20 flex justify-center text-center items-center cursor-pointer no-underline"
      style={{
        background: numItemActivo === item.numeral ? '#0071BC' : '#07C4EC',
      }}
    >
      <h4 className=" font-normal text-white text-xs sm:text-xs sm:leading-3 md:text-xs lg:leading-3 lg:text-sm xl:text-base leading-4 xl:leading-4 lg:leading-4">
        {item.nombre}
      </h4>
    </Link>
  );
}

const NamePanel = () => {
  const location = useLocation();
  const indiceEstadisticas = useAppSelector(selectClasificadoresNivel1);
  const numItemActivo = useAppSelector(selectComponenteIndicePath);

  return (
    <div className="grid grid-cols-6 gap-4 my-10">
      {indiceEstadisticas.map((item) => NavItem(item, location, numItemActivo))}
    </div>
  );
};

export default NamePanel;
