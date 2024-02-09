import React from 'react';

import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Button,
} from '@fluentui/react-components';
import { MenuButtonProps } from '@fluentui/react-components';
import {
  Eye24Regular,
  ChevronDown24Filled,
  ArrowExportRtl24Filled,
  ArrowExport24Filled,
  DataLine24Regular,
} from '@fluentui/react-icons';
import { ColorPicker, Select } from 'antd';

function PresentationSeriesConfigurationList({ color, nombre }) {
  const onClick = () => alert('Primary action button clicked.');
  const primaryActionButtonProps = {
    onClick,
  };

  return (
    <div className="flex flex-row max-h-16">
      <div className="border border-solid border-gray-300 p-1 flex  items-center ">
        1
      </div>
      <div className="flex items-center border border-solid border-gray-300  p-1 border-b-0 w-full content-center gap-1 justify-between px-1">
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
            <Menu positioning="below-end">
              <MenuTrigger disableButtonEnhancement>
                {(triggerProps) => (
                  <SplitButton
                    menuButton={triggerProps}
                    primaryActionButton={primaryActionButtonProps}
                    icon={<DataLine24Regular />}
                  ></SplitButton>
                )}
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<ChevronDown24Filled />}></MenuItem>
                  <MenuItem icon={<ArrowExportRtl24Filled />}></MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>

          <Button icon={<ArrowExportRtl24Filled />} />
          <Button icon={<ArrowExport24Filled />} />
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfigurationList;
