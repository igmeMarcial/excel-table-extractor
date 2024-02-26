import React, { useState } from 'react';

import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Button,
  makeStyles,
} from '@fluentui/react-components';
import {
  Eye24Regular,
  ChevronDown24Filled,
  ArrowExportRtl24Filled,
  ArrowExport24Filled,
  EyeOff24Regular,
   DataBarVertical24Regular,
  DataBarHorizontal24Regular,
  DataLine24Regular,
  DataArea24Regular,
  DataPie24Regular,
} from '@fluentui/react-icons';
import { ColorPicker } from 'antd';

interface PresentationSeriesConfigurationListProps {
  color: string;
  nombre: string;
  number: number;
}

const useStyles = makeStyles({
  itemPopover: { minWidth: '55px' },
  itemMenu: { justifyContent: 'center' },
  activeBtn: {
    backgroundColor: '#E6E6E6',
    ':hover': {
      backgroundColor: '#E6E6E6',
    },
  },
});

const PresentationSeriesConfigurationList: React.FC<
  PresentationSeriesConfigurationListProps
> = ({ color, nombre, number }) => {
  const [activeBtn, setActiveBtn] = useState<string>('left');
  const [iconVisible, setIconVisible] = useState<boolean>(true);
  const [selectedIcon, setSelectedIcon] = useState<React.ReactElement>(
    <DataLine24Regular />
  );
  const classes = useStyles();

  const handleMenuItemClick = (selectedIcon: React.ReactElement) => {
    setSelectedIcon(selectedIcon);
  };
  const onClick = () => alert('Primary action button clicked.');

  const primaryActionButtonProps = {
    onClick,
  };

  const handleClickEyes = (event) => {
    const buttonText = event.target.textContent;
    setIconVisible(!iconVisible);
  };
  const handleChangeArrow = (key: string) => {
    setActiveBtn(key);
  };

  const menuItems = [
    { icon: <DataBarVertical24Regular/>, id: 'icon1' },
    { icon: <DataBarHorizontal24Regular />, id: 'icon2' },
    { icon: <DataLine24Regular />, id: 'icon3' },
    { icon: <DataArea24Regular/>, id: 'icon4' },
    { icon: <DataPie24Regular/>, id: 'icon5' },
  ];

  return (
    <div className="flex flex-row max-h-16">
      <div className="border border-solid border-gray-300 p-1 flex  items-center  min-w-4">
        {number}
      </div>
      <div className="flex items-center border border-solid border-gray-300  p-1 border-b-0 w-full content-center gap-1 justify-between px-1">
        <div
          className="flex
          content-center items-center
          gap-1
        "
        >
          <Button
            onClick={handleClickEyes}
            appearance="subtle"
            icon={iconVisible ? <Eye24Regular /> : <EyeOff24Regular />}
          />

          <ColorPicker defaultValue={color} size="small" />
          <p className=" block text-xs max-w-full m-y-auto  min-w-16 ">{nombre}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex">
            <Menu positioning="below-end">
              <MenuTrigger disableButtonEnhancement>
                {(triggerProps) => (
                  <SplitButton
                    menuButton={triggerProps}
                    primaryActionButton={primaryActionButtonProps}
                    icon={selectedIcon}
                  ></SplitButton>
                )}
              </MenuTrigger>

              <MenuPopover className={classes.itemPopover}>
                <MenuList>
                  {menuItems.map((menuItem) => (
                    <MenuItem
                      className={classes.itemMenu}
                      key={`${menuItem.icon.type} + ${menuItem.id}`}
                      onClick={() => handleMenuItemClick(menuItem.icon)}
                      icon={menuItem.icon}
                    ></MenuItem>
                  ))}
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
          <div className="flex">
            <Button
              appearance="transparent"
              className={activeBtn === 'left' ? classes.activeBtn : ''}
              icon={<ArrowExportRtl24Filled />}
              onClick={() => handleChangeArrow('left')}
            />
            <Button
              appearance="transparent"
              className={activeBtn === 'right' ? classes.activeBtn : ''}
              icon={<ArrowExport24Filled />}
              onClick={() => handleChangeArrow('right')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationSeriesConfigurationList;
