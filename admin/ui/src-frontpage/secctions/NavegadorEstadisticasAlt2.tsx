import EstadisticaVistaTabs from '../blocks/EstadisticaVistaTabs';

import { ColorsType } from '../types/Colors';
import NavEstaditicas from '../components/NavEstadisticas';
import { useLocation } from 'react-router-dom';
import { getQueryParam } from '../../src/utils/url-utils';
import { useGetEstadisticaQuery } from '../app/services/estadistica';
import { QUERY_PARAM_ESTADISTICA_ID } from '../../src/core/constantes';
import MarcoOrdenadorNav from '../components/MarcoOrdenadorNav';

export default function NavegadorEstadisticasAlt2() {
  const location = useLocation();
  // Extraer el id de la estadistica de la url
  const urlEstadisticaId = +getQueryParam(location, QUERY_PARAM_ESTADISTICA_ID);
  const { data: estadistica } = useGetEstadisticaQuery(urlEstadisticaId);
  //Colores de componentes
  //Colores de componentes
  const colors: ColorsType = {
    '1': '#4cd4f3',
    '2': '#fe903a',
    '3': '#fd4d5e',
    '4': '#0183ad',
    '5': '#3c9326',
    '6': '#feb739',
  };

  return (
    <>
      <MarcoOrdenadorNav />
      <NavEstaditicas />
      <div>
        <EstadisticaVistaTabs estadistica={estadistica} />
      </div>
    </>
  );
}
