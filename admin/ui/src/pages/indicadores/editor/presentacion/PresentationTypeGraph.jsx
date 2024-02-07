import React from 'react';
import { Button } from '@fluentui/react-components';
import {
  DataBarVertical24Regular,
  DataBarHorizontal24Regular,
  DataLine24Regular,
  DataArea24Regular,
  DataPie24Regular,
} from '@fluentui/react-icons';
function PresentationTypeGraph() {
  return (
    <div>
      <p>Tipo de gráfico</p>
      <div className="flex gap-3">
        <Button appearance="subtle" icon={<DataBarVertical24Regular />} />
        <Button appearance="subtle" icon={<DataBarHorizontal24Regular />} />
        <Button appearance="subtle" icon={<DataLine24Regular />} />
        <Button appearance="subtle" icon={<DataArea24Regular />} />
        <Button appearance="subtle" icon={<DataPie24Regular />} />
      </div>
    </div>
  );
}

export default PresentationTypeGraph;
