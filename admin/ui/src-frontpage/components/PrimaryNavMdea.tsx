import React, { useMemo } from 'react';
import { IndiceItem } from '../types/IndiceItem';
import { Link, useLocation } from 'react-router-dom';
import { ColorsType } from '../types/Colors';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectClasificadoresNivel1, setColorComponent } from '../app/AppSlice';
import chroma from 'chroma-js';
import { COLORES_MDEA } from '../../src/config/colors';
import { QUERY_PARAM_ESTADISTICA_INDICE_PATH } from '../../src/core/constantes';
interface PanelItemProps {
  item: IndiceItem;
  colors: ColorsType;
  transformStyles: (item: IndiceItem) => React.CSSProperties;
  handleClick: (color: string) => void;
  index: number;
}

const pathRoot = window.AesaInfo.pluginUrl;
const imgBasePath = pathRoot + '/public/assets/images/mdea';

const PanelItem: React.FC<PanelItemProps> = ({
  item,
  colors,
  transformStyles,
  handleClick,
  index,
}) => {
  const location = useLocation();

  return (
    <Link
      key={item.numeral}
      to={newPathUrl(location, 'estadistica', item.numeral + '.1.1.1')}
      className={`p-2 rounded-lg mb-2 md:mb-4 min-h-16 flex justify-center text-center items-center cursor-pointer no-underline hover:bg-black flex flex-col`}
      style={transformStyles(item)}
      onClick={() => handleClick(colors[item.numeral])}
    >
      <div>
        <img className="w-[52px]" src={`${imgBasePath}/C0${index}.svg`} />
      </div>
      <h4 className="content-center h-2/3 font-normal text-white text-xm md:text-sm leading-3 sm:leading-5 md:leading-4 p-0 m-0">
        {index} {item.nombre}
      </h4>
    </Link>
  );
};

function PrimaryNavMdea() {
  const colors = COLORES_MDEA;
  const clasificadoresN1 = useAppSelector(selectClasificadoresNivel1);
  const location = useLocation();
  const activeItem = getQueryParam(
    location,
    QUERY_PARAM_ESTADISTICA_INDICE_PATH,
    '1.1.1.1'
  );
  const numItemActivo = activeItem.split('.')[0];
  const distpath = useAppDispatch();
  const handleClick = (color: string) => {
    distpath(setColorComponent(color));
  };

  const transformStyles = useMemo(() => {
    const calculateStyles = (item: IndiceItem) => {
      const tranform = 'scaleX(1.03) scaleY(1.03)';
      const transition =
        'transform 300ms ease 0ms,border-radius 300ms ease 0ms,border 300ms ease 0ms,background-color 300ms ease 0ms,background-image 300ms ease 0ms';

      return {
        background:
          numItemActivo === item.numeral
            ? colors[item.numeral]
            : chroma(colors[item.numeral]),
        boxShadow:
          numItemActivo === item.numeral
            ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
            : 'none',
        WebkitTransform: numItemActivo === item.numeral ? tranform : 'none',
        MozTransform: numItemActivo === item.numeral ? tranform : 'none',
        MsTransform: numItemActivo === item.numeral ? tranform : 'none',
        OTransform: numItemActivo === item.numeral ? tranform : 'none',
        transform: numItemActivo === item.numeral ? tranform : 'none',
        transition: transition,
      };
    };

    return calculateStyles;
  }, [numItemActivo, colors]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5 mb-5">
      {clasificadoresN1.map((item: IndiceItem, index) => (
        <PanelItem
          key={item.numeral}
          item={item}
          colors={colors}
          transformStyles={transformStyles}
          handleClick={handleClick}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default PrimaryNavMdea;
