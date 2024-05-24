import { useState } from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import MainLayout from '../../layout/MainLayout';
import ESTADISTICA_DEMO from './data-estadistico';
import DbOps from './DbOps';
import EstadisticaLoader from './EstadisticaLoader';

function Dev() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Post estadistica
  const onPostEstadistica = () => {
    setLoading(true);
    fetch(`${window.AesaInfo.apiUrl}/estadisticas`, {
      method: 'POST',
      body: JSON.stringify(ESTADISTICA_DEMO),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  return (
    <MainLayout>
      <div className="p-6">
        <DbOps />
        <EstadisticaLoader />
        <div className="flex gap-4">
          <Button onClick={onPostEstadistica} className="m-5">
            Post estadistica
          </Button>
        </div>
        <div className="mt-2 border">
          {loading ? (
            <div className="flex h-40 justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <textarea
              disabled
              className="w-full h-40 p-4"
              value={JSON.stringify(data || {}, null, 2)}
            ></textarea>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Dev;
