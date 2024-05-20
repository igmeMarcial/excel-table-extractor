import React, { useMemo } from 'react';
import { IndiceItem } from '../types/IndiceItem';
import { Link, useLocation } from 'react-router-dom';
import { ColorsType } from '../types/Colors';
import { getQueryParam, newPathUrl } from '../../src/utils/url-utils';
import { useAppSelector } from '../app/hooks';
import { selectClasificadoresNivel1 } from '../app/AppSlice';
import chroma from 'chroma-js';
import { COLORES_MDEA } from '../../src/config/colors';
import { QUERY_PARAM_ESTADISTICA_INDICE_PATH } from '../../src/core/constantes';
import './mdea.scss';
interface PanelItemProps {
  item: IndiceItem;
  colors: ColorsType;
  transformStyles: (item: IndiceItem) => React.CSSProperties;
  index: number;

  numItemActivo: string;
}

const pathRoot = window.AesaInfo.pluginUrl;
const imgBasePath = pathRoot + '/public/assets/images/mdea';

const PanelItem: React.FC<PanelItemProps> = ({
  item,
  colors,
  transformStyles,
  index,
  numItemActivo,
}) => {
  const location = useLocation();

  return (
    <div className="">
      <Link
        key={item.numeral}
        to={newPathUrl(location, 'estadistica', item.numeral + '.1.1.1')}
        className={`p-2 rounded-lg mb-2 md:mb-2 min-h-16 max-h-[100px] h-full justify-center text-center items-center cursor-pointer no-underline hover:bg-black flex flex-col`}
        style={transformStyles(item)}
      >
        <div>
          <img
            alt=""
            className="w-[52px]"
            src={`${imgBasePath}/C0${index}.svg`}
          />
        </div>
        <h4 className="content-center h-2/3 font-normal text-white text-xm md:text-sm leading-3 sm:leading-5 md:leading-4 p-0 m-0">
          {index} {item.nombre}
        </h4>
      </Link>
      <div
        style={{
          borderBottomColor: `${colors[item.numeral]}`,
          visibility: numItemActivo === item.numeral ? 'visible' : 'hidden',
          opacity: numItemActivo === item.numeral ? '1' : '0',
          transition: 'opacity 0.3s, visibility 0.3s',
        }}
        className={`arrow-up`}
      ></div>
    </div>
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

  const transformStyles = useMemo(() => {
    const calculateStyles = (item: IndiceItem) => {
      return {
        background:
          numItemActivo === item.numeral
            ? colors[item.numeral]
            : chroma(colors[item.numeral]),
      };
    };

    return calculateStyles;
  }, [numItemActivo, colors]);
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5 "
      style={{ borderBottom: `4px solid ${colors[numItemActivo]}` }}
    >
      {clasificadoresN1.map((item: IndiceItem, index) => (
        <PanelItem
          key={item.numeral}
          item={item}
          colors={colors}
          transformStyles={transformStyles}
          index={index + 1}
          numItemActivo={numItemActivo}
        />
      ))}
    </div>
  );
}

export default PrimaryNavMdea;
