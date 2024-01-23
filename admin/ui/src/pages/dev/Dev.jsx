import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { makeStyles, Button } from '@fluentui/react-components';

function Dev() {
  const url = '/dev/reset-database';
  const [data, setData] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
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
        console.log(data);
        setLoading(false);
        setResultMessage(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      <div className="p-6 ">
        <Button onClick={handleClick} className="m-5">
          Reset db
        </Button>
        <div className="border border-gray-200 w-2/3 h-52 mx-auto mt-10 flex justify-center items-center">
          <p>{data && JSON.stringify(data)}</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dev;
