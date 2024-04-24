import React, { useEffect } from 'react';
import { ColorsType } from '../types/Colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import {
  selectClasificadoresNivel1,
  selectMarcoOrdenadorSeleccionado,
} from '../app/AppSlice';
import { newPathUrl } from '../../src/utils/url-utils';

import {
  QUERY_PARAM_ESTADISTICA_INDICE_PATH,
  QUERY_PARAM_MARCO_ORDENADOR,
} from '../../src/core/constantes';
import PrimaryNavMdea from './PrimaryNavMdea';
import PrimaryNavOds from './PrimaryNavOds';
import PrimaryNavOcde from './PrimaryNavOcde';
import {
  lineamientosPolitica,
  objetivosOCDE,
  objetivosODS,
} from '../data/objectsOds';
import PrimaryNavPna from './PrimaryNavPna';

interface NamePanelProps {
  colors: ColorsType; // Tipo definido para los colores
}

const NamePanelComponents: React.FC<NamePanelProps> = ({ colors }) => {
  const clasificadoresN1 = useAppSelector(selectClasificadoresNivel1);
  const activeItem = useAppSelector(selectMarcoOrdenadorSeleccionado);

  //Use location se repite ojo
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const marcoOrdenador = params.get(QUERY_PARAM_MARCO_ORDENADOR);
    if (marcoOrdenador && !params.has(QUERY_PARAM_ESTADISTICA_INDICE_PATH)) {
      const loadPath = newPathUrl(
        location,
        QUERY_PARAM_ESTADISTICA_INDICE_PATH,
        '1.1.1.1'
      );
      navigate(loadPath);
    }
  }, [location.search]);

  return (
    <>
      {activeItem === 'mdea' && (
        <PrimaryNavMdea items={clasificadoresN1} colors={colors} />
      )}
      {activeItem === 'ods' && <PrimaryNavOds items={objetivosODS} />}
      {activeItem === 'ocde' && <PrimaryNavOcde items={objetivosOCDE} />}
      {activeItem === 'pna' && <PrimaryNavPna items={lineamientosPolitica} />}
    </>
  );
};

export default NamePanelComponents;
