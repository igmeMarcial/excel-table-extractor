import { useLocation } from 'react-router-dom';

import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import IndicadorEditorBottomActions from './IndicadorEditorBottomActions';
import { useGetEstadisticaQuery } from '../../../app/services/estadistica';
import { getPathResourceId } from '../../../utils/url-utils';
import { useAppDispatch } from '../../../app/hooks';
import { setEstadisticaTablaDatos } from '../EstadisticaFormSlice';
import tablaDatosTest from '../../../data/tabla-datos';

function IndicadorEditorPage() {
  const dispath = useAppDispatch();
  const location = useLocation();
  const resourceId = getPathResourceId(location);
  // Get data from the API
  if (resourceId) useGetEstadisticaQuery(+resourceId);

  dispath(setEstadisticaTablaDatos(tablaDatosTest));

  return (
    <MainLayout>
      <IndicadorEditorhHeader />
      <div className="px-12">
        <IndicadorEditorTabs />
      </div>

      <IndicadorEditorBottomActions />
    </MainLayout>
  );
}

export default IndicadorEditorPage;
