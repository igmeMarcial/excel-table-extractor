import React from 'react';
import { Button } from 'antd';
import IndicadorRestService from '../../../services/IndicadorRestService';
import { Link } from 'react-router-dom';
import { getNewPathUrl } from '../../../hooks/usePathRoute';

function IndicadorEditorBottomActions({ estadistica }) {
  // console.log(estadistica);
  const handleClick = () => {
    IndicadorRestService.create(estadistica)
      .then((response) => {
        console.log('registro exitoso');
      })
      .catch((err) => {
        console.log('error al registrar');
      })
      .finally(() => {
        console.log('finalizado');
      });
  };

  return (
    <div className="pl-12 bg-custom-grey py-2 flex space-x-4">
      <Button
        onClick={handleClick}
        type="primary "
        disabled={!Object.keys(estadistica).length}
      >
        Registrar
      </Button>
      <Link to={getNewPathUrl('indicadores')}>
        <Button>Cancelar</Button>
      </Link>
    </div>
  );
}
export default IndicadorEditorBottomActions;
