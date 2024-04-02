import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Switch,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';
import { useState } from 'react';

const ChartEjes: React.FC = () => {
  const [range, setRange] = useState({
    min: 0,
    max: 20,
  });
  const [selectedInterval, setSelectedInterval] = useState({
    x: 0,
    y: 0,
  });
  const handleChange = (e) => {};

  const handleMenuItemClick = (value, name) => {
    setSelectedInterval({
      ...selectedInterval,
      [name]: value,
    });
  };
  const intervalos = [];
  for (let i = range.min; i <= range.max; i += 2) {
    intervalos.push(i);
  }

  return (
    <div>
      <span>Etiquetas:</span>
      <br />
      <span>Eje X:</span>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps}>
              {selectedInterval.x}
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover style={{ minWidth: '60px' }}>
          <MenuList>
            {intervalos.map((item) => (
              <MenuItem
                key={item}
                onClick={() => handleMenuItemClick(item, 'x')}
              >
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
      <br />
      <span>Eje Y:</span>

      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps}>
              {selectedInterval.y}
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover style={{ minWidth: '60px' }}>
          <MenuList>
            {intervalos.map((item) => (
              <MenuItem
                key={item}
                onClick={() => handleMenuItemClick(item, 'y')}
              >
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
      <Switch
        label="Habilitar eje secundario"
        onChange={handleChange}
        // checked={checked}
      />
    </div>
  );
};

export default ChartEjes;
