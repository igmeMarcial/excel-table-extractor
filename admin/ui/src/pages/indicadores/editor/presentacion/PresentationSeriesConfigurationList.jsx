import React from 'react';
import { Button } from '@fluentui/react-components';
import {
  Eye24Regular,
  ChevronDown24Filled,
  ArrowExportRtl24Filled,
  ArrowExport24Filled,
} from '@fluentui/react-icons';
import { ColorPicker, Select } from 'antd';

function PresentationSeriesConfigurationList() {
  return (
    <div className="flex flex-row ">
      <div className="border border-solid border-gray-300 p-1 flex  items-center ">
        1
      </div>
      <div className="flex items-center border border-solid border-gray-300  p-1 border-b-0 w-full content-center gap-1 justify-around">
        <Eye24Regular />
        <ColorPicker defaultValue="#1677ff" size="small" />
        <p className="text-xs">Areas Naturales protegidas</p>

        <div>
          <Button icon={<ArrowExportRtl24Filled />} />
          <Button icon={<ChevronDown24Filled />} />
        </div>
        <div className="flex gap-2">
          <Button icon={<ArrowExportRtl24Filled />} />
          <Button icon={<ArrowExport24Filled />} />
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfigurationList;
