import React, { useCallback, useMemo } from 'react';
import { ColorsType } from '../types/Colors';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import chroma from 'chroma-js';
import {
  selectClasificadoresNivel1,
  selectComponenteIndicePath,
  setColorComponent,
} from '../app/AppSlice';
import { newPathUrl } from '../../src/utils/url-utils';
import { IndiceItem } from '../types/IndiceItem';

interface NamePanelProps {
  colors: ColorsType; // Tipo definido para los colores
}

interface PanelItemProps {
  item: IndiceItem;
  colors: ColorsType;
  transformStyles: (item: IndiceItem) => React.CSSProperties;
  handleClick: (color: string) => void;
}
const PanelItem: React.FC<PanelItemProps> = ({
  item,
  colors,
  transformStyles,
  handleClick,
}) => {
  const location = useLocation();

  return (
    <Link
      key={item.numeral}
      to={newPathUrl(location, 'estadistica', item.numeral + '.1.1.1')}
      className={`p-2 rounded-lg mb-2 md:mb-4 min-h-20 flex justify-center text-center items-center cursor-pointer no-underline hover:bg-black`}
      style={transformStyles(item)}
      onClick={() => handleClick(colors[item.numeral])}
    >
      <h4 className="font-normal text-white text-lg md:text-base leading-3 sm:leading-5 md:leading-4 p-0 m-0">
        {item.nombre}
      </h4>
    </Link>
  );
};
const NamePanelComponents: React.FC<NamePanelProps> = ({ colors }) => {
  const clasificadoresN1 = useAppSelector(selectClasificadoresNivel1);
  const numItemActivo = useAppSelector(selectComponenteIndicePath);
  const distpath = useAppDispatch();
  console.log('Componente cargado ========');

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10 mb-5">
      {clasificadoresN1.map((item: IndiceItem) => (
        <PanelItem
          key={item.numeral}
          item={item}
          colors={colors}
          transformStyles={transformStyles}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default NamePanelComponents;
