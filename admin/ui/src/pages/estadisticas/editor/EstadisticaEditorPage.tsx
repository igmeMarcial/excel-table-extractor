import { useLocation } from 'react-router-dom';

import MainLayout from '../../../layout/MainLayout';
import IndicadorEditorhHeader from './IndicadorEditorhHeader';
import IndicadorEditorTabs from './IndicadorEditorTabs';
import { useGetEstadisticaQuery } from '../../../app/services/estadistica';
import { getPathResourceId } from '../../../utils/url-utils';
import { useAppDispatch } from '../../../app/hooks';
import { useEffect } from 'react';
import {
  resetEstadisticaModel,
  setEstadisticaModel,
} from '../EstadisticaFormSlice';

function EstadisticaEditorPage() {
  const dispath = useAppDispatch();
  const location = useLocation();
  const resourceId = getPathResourceId(location);
  // Get data from the API
  const estadistica = useGetEstadisticaQuery(+resourceId, {
    skip: !resourceId,
  });
  // Reset the form
  useEffect(() => {
    dispath(resetEstadisticaModel());
  }, [resourceId]);
  // Set the model
  useEffect(() => {
    if (!resourceId || !estadistica.data) {
      return;
    }
    dispath(setEstadisticaModel(estadistica.data));
  }, [estadistica.data]);

  return (
    <MainLayout>
      <IndicadorEditorhHeader />
      <div className="px-12 pb-8">
        <IndicadorEditorTabs />
      </div>
    </MainLayout>
  );
}

export default EstadisticaEditorPage;
