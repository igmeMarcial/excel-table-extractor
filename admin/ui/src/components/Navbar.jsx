import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { NavLink, useLocation } from 'react-router-dom';

const items = [
  { text: 'Indicadores', path: 'indicadores' },
  { text: 'Anuarios', path: 'anuarios' },
  { text: 'Plantilla', path: 'plantillas' },
  { text: 'Configuracion', path: 'configuracion' },
];

const useStyles = makeStyles({
  bar: {
    backgroundColor: '#2271B1',
  },
  item: {
    color: '#CFE4FA',
    ':hover': {
      color: '#FFFFFF',
    },
  },
  active: {
    fontWeight: 600,
    color: '#FFFFFF',
  },
});

export default function Navbar() {
  const classes = useStyles();
  // Get the current location params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab');
  const getNewUrl = (tab) => {
    queryParams.set('tab', tab);
    return '?' + queryParams.toString();
  };

  return (
    <nav className={'flex justify-start items-center h-10 px-4 ' + classes.bar}>
      {items.map((item, index) => {
        return (
          <NavLink
            to={getNewUrl(item.path)}
            key={index}
            className={
              `block px-2 text-white ${classes.item} ` +
              (currentTab === item.path ? classes.active : '')
            }
          >
            {item.text}
          </NavLink>
        );
      })}
    </nav>
  );
}
