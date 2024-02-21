import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Button, Spinner } from '@fluentui/react-components';
import { useGetEstadisticaQuery } from '../../app/services/estadistica';
import ESTADISTICA_DEMO from './data-estadistico';
import {
  selectCurrentEstadisticaId,
  setCurrentEstadisticaId,
} from '../../app/AppSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

function Dev() {
  const url = '/dev/reset-database';
  const dispath = useAppDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [estadisticaId, setEstadisticaId] = useState(1);
  const currentEstadisticaId = useAppSelector(selectCurrentEstadisticaId);
  const { data: estadistica, error } =
    useGetEstadisticaQuery(currentEstadisticaId);

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
          <input
            value={estadisticaId}
            type="number"
            onChange={(e) => setEstadisticaId(e.target.value)}
          />
          <Button onClick={onPostEstadistica} className="m-5">
            Post estadistica
          </Button>
          <Button
            onClick={() => {
              dispath(setCurrentEstadisticaId(estadisticaId));
            }}
            className="m-5"
          >
            Load estadistica
          </Button>
        </div>
        <div className="mt-10 border">
          <textarea
            disabled
            className="w-full h-40 p-4"
            value={JSON.stringify(estadistica || {}, null, 2)}
          ></textarea>
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
