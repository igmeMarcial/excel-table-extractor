import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Switch,
  Field,
  Input,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';
import { useCallback, useState } from 'react';

const ChartEjes: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [range, setRange] = useState({
    min: 0,
    max: 20,
  });
  const [selectedInterval, setSelectedInterval] = useState({
    x: 0,
    y: 0,
  });

  const handleChange = useCallback(
    (ev) => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked]
  );

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
            <SplitButton menuButton={triggerProps} size="small">
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
            <SplitButton menuButton={triggerProps} size="small" disabled={true}>
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
      {/* <Field label="Número de decimales en etiquetas">
        <Input type="number" onChange={handleChange} min="0" />
      </Field> */}
      <Switch
        label="Habilitar eje secundario"
        onChange={handleChange}
        // checked={checked}
      />
    </div>
  );
};

export default ChartEjes;
