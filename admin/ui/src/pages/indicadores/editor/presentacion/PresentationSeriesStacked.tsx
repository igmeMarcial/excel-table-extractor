import React from 'react';
import { Switch } from '@fluentui/react-components';
import { SwitchProps } from '@fluentui/react-components';

const PresentationSeriesStacked: React.FC = () => {
  return (
    <div>
      <p>Mostrar series apiladas</p>
      <Switch label="No" />
    </div>
  );
}

export default PresentationSeriesStacked;
