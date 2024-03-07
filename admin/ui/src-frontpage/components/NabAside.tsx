import React, { useEffect, useState } from 'react';
import {
  ChevronRight24Filled,
  ChevronDown24Filled,
} from '@fluentui/react-icons';
import { newPathUrl } from '../../src/utils/url-utils';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectClaficadorNivel1Activo,
  selectClasificadoresDesdeNivel2,
} from '../app/AppSlice';
import { deepClone } from '../../src/utils/object-utils';
import { IndiceItem } from '../types/IndiceItem';

interface RenderItemProps {
  model: IndiceItem;
  onExpandToggleClick: (model: IndiceItem) => void;
}

const RenderItem = ({ model, onExpandToggleClick }: RenderItemProps) => {
  const location = useLocation();
  let paddingLeftClass = '';
  if (model.nivel === 3 && model.visible) {
    paddingLeftClass = 'pl-6';
  }
  if (model.nivel === 4 && model.visible) {
    paddingLeftClass = 'pl-12';
  }
  return (
    <div className={`${paddingLeftClass} +  py-custom-pad flex gap-1`}>
      <button
        className="hover:text-custom-blue border-none p-0 appearance-none cursor-pointer no-underline  focus:outline-none flex justify-start bg-inherit"
        onClick={() => {
          onExpandToggleClick(model);
        }}
      >
        {!model.estadisticaId &&
          (model.expanded ? (
            <ChevronDown24Filled style={{ width: '16px', height: '16px' }} />
          ) : (
            <ChevronRight24Filled style={{ width: '16px', height: '16px' }} />
          ))}
      </button>
      <Link
        to={newPathUrl(location, 'estadistica', model.numeral)}
        className="flex items-start justify-start  bg-gray-100 gap-1 no-underline"
      >
        <div className=" text-black hover:text-custom-blue text-xs flex gap-custom-pad ">
          <div>{model.numeral}</div>
          <div className="text-start">{model.nombre}</div>
        </div>
      </Link>
    </div>
  );
};

function NabAside() {
  const [indice, setIndice] = useState<IndiceItem[]>([]);
  let indiceOriginal = useAppSelector(selectClasificadoresDesdeNivel2);
  let clasificadorNivel1Activo = useAppSelector(selectClaficadorNivel1Activo);
  const filterNivel1 = (arr) => {
    return arr.map((item) => {
      item.expanded = false;
      if (
        item.nivel === 2 &&
        item.numeral.split('.')[0] === clasificadorNivel1Activo
      ) {
        item.visible = true;
      } else {
        item.visible = false;
      }
      return item;
    });
  };
  useEffect(() => {
    const clonedIndice = deepClone(indiceOriginal);
    setIndice(filterNivel1(clonedIndice));
  }, [clasificadorNivel1Activo, indiceOriginal]);

  const toggleMenu = (model) => {
    const { numeral, expanded, nivel } = model;

    const doExpand = !expanded;

    const newindice = indice.map((item) => {
      //Invertir toggle expander
      if (item.numeral === numeral) {
        item.expanded = !item.expanded;
      }
      //Hijos directos e indirectos
      if (item.nivel > nivel && item.numeral.startsWith(numeral)) {
        if (item.nivel === nivel + 1) {
          item.visible = doExpand;
        }
        if (item.nivel > nivel + 1 && !doExpand) {
          item.visible = false;
        }
      }
      return item;
    });
    setIndice(newindice);
  };

  return (
    <div className="bg-gray-100 p-3  h-full border-x-0 border-b-0 border-t-4 border-t-custom-blue border-solid">
      <div className="flex flex-col pl-0 my-0">
        {indice.map((item, index) => {
          if (!item.visible) {
            return null;
          }
          return (
            <RenderItem
              key={item.numeral}
              model={item}
              onExpandToggleClick={toggleMenu}
            />
          );
        })}
      </div>
    </div>
  );
}
export default NabAside;
