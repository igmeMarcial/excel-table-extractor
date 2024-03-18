import { Link, useLocation } from 'react-router-dom';
import { newPathUrl } from '../../src/utils/url-utils';
import { useAppSelector } from '../app/hooks';
import {
  selectComponenteIndicePath,
  selectClasificadoresNivel1,
} from '../app/AppSlice';
import { IndiceItem } from '../types/IndiceItem';
import chroma from 'chroma-js';

function NavItem(item: IndiceItem, location, numItemActivo: any) {
  const colors = {
    '1': '#01b0f1',
    '2': '#c45a10',
    '3': '#c10100',
    '4': '#0170c0',
    '5': '#018000',
    '6': '#bc9100',
  };

  const transformStyles = {
    background:
      numItemActivo === item.numeral
        ? colors[item.numeral]
        : chroma(colors[item.numeral]),
    boxShadow:
      numItemActivo === item.numeral
        ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        : 'none',
    WebkitTransform: numItemActivo === item.numeral ? 'scale(1.1)' : 'none',
    MozTransform: numItemActivo === item.numeral ? 'scale(1.1)' : 'none',
    MsTransform: numItemActivo === item.numeral ? 'scale(1.1)' : 'none',
    OTransform: numItemActivo === item.numeral ? 'scale(1.1)' : 'none',
    transform: numItemActivo === item.numeral ? 'scale(1.1)' : 'none',
    transition: 'all 0.2s ease-in-out', // Transición suave
  };

  return (
    <Link
      key={item.numeral}
      to={newPathUrl(location, 'estadistica', item.numeral + '.1.1.1')}
      className={`p-2 rounded-lg mb-4 h-20 sm:h-10 md:h-14 lg:h-16 xl:h-20 flex justify-center text-center items-center cursor-pointer no-underline hover:bg-black`}
      style={transformStyles}
    >
      <h4 className=" font-normal text-white text-xs sm:text-xs sm:leading-3 md:leading-3 md:text-xs lg:leading-3 lg:text-sm xl:text-base leading-4 xl:leading-4 lg:leading-4">
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
    <div className="grid sm:grid-cols-6 gap-4 mt-10 mb-5 grid-cols-3">
      {indiceEstadisticas.map((item) => NavItem(item, location, numItemActivo))}
    </div>
  );
};

export default NamePanel;
