import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Button, Spinner } from '@fluentui/react-components';

import ESTADISTICA_DEMO from './data-estadistico';

function Dev() {
  const url = '/dev/reset-database';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    setLoading(true);

    fetch(AesaInfo.apiUrl + url, {
      method: 'GET',
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
  // Post estadistica
  const onPostEstadistica = () => {
    setLoading(true);
    fetch(`${AesaInfo.apiUrl}/estadisticas`, {
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
        <div className="flex gap-4">
          <Button onClick={handleClick} className="m-5">
            Reset db
          </Button>
          <Button onClick={onPostEstadistica} className="m-5">
            Post estadistica
          </Button>
        </div>
        <div className="mt-10 border">
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
