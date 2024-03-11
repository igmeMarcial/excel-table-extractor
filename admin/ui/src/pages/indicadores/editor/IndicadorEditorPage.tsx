import { useLocation } from 'react-router-dom';

import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import { useGetEstadisticaQuery } from '../../../app/services/estadistica';
import { getPathResourceId } from '../../../utils/url-utils';
import { useAppDispatch } from '../../../app/hooks';
import { setEstadisticaTablaDatos } from '../EstadisticaFormSlice';
import tablaDatosTest from '../../../data/tabla-datos';
import { useGetIndiceClasificadoresQuery } from '../../../app/services/clasificador';

function IndicadorEditorPage() {
  const dispath = useAppDispatch();
  const location = useLocation();
  const resourceId = getPathResourceId(location);
  // Get data from the API
  if (resourceId) useGetEstadisticaQuery(+resourceId);
  // Cargar indice de clasificadores
  useGetIndiceClasificadoresQuery();
  setTimeout(() => {
    //dispath(setEstadisticaTablaDatos(tablaDatosTest));
  }, 0);

  return (
    <MainLayout>
      <IndicadorEditorhHeader />
      <div className="px-12 pb-8">
        <IndicadorEditorTabs />
      </div>
    </MainLayout>
  );
}

export default IndicadorEditorPage;
