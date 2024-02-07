import React from 'react';
import { Button } from '@fluentui/react-components';
import {
  Eye24Regular,
  ChevronDown24Filled,
  ArrowExportRtl24Filled,
  ArrowExport24Filled,
} from '@fluentui/react-icons';
import { ColorPicker, Select } from 'antd';

function PresentationSeriesConfigurationList({ color, nombre }) {
  return (
    <div className="flex flex-row max-h-16">
      <div className="border border-solid border-gray-300 p-1 flex  items-center ">
        1
      </div>
      <div className="flex items-center border border-solid border-gray-300  p-1 border-b-0 w-full content-center gap-1 justify-between px-3">
        <div
          className="flex
          content-center items-center
          gap-3
        "
        >
          <Button appearance="subtle" icon={<Eye24Regular />} />
          <ColorPicker defaultValue={color} size="small" />
          <p className="text-xs max-w-full md:max-w-48">{nombre}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex">
            <Button icon={<ArrowExportRtl24Filled />} />
            <Button icon={<ChevronDown24Filled />} />
          </div>

          <Button icon={<ArrowExportRtl24Filled />} />
          <Button icon={<ArrowExport24Filled />} />
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfigurationList;
