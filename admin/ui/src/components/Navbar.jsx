import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#2271B1', // Fondo gris
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'row',
  },
  li: {
    marginRight: '20px',
    width: '83px', // Ancho
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'space-between', // Alinear elementos internos
  },
  link: {
    // Puedes ajustar el color del texto según tus necesidades
    fontFamily: 'Segoe UI', // Agrega la fuente Segoe UI
    fontWeight: 600, // Peso de la fuente
    fontSize: '14px', // Tamaño de la fuente
    lineHeight: '17.29px', // Altura de línea
    textDecorationLine: 'none',
    color: '#CFE4FA',
  },
  linkActive: {
    fontFamily: 'Segoe UI', // Agrega la fuente Segoe UI
    fontWeight: 700, // Peso de la fuente
    fontSize: '14px', // Tamaño de la fuente
    lineHeight: '17.29px', // Altura de línea
    textDecorationLine: 'none',
    color: '#ffffff',
  },
});

export default function Navbar() {
  const classes = useStyles();
  // Get the current location params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getNewUrl = (tab) => {
    queryParams.set('tab', tab);
    return '?' + queryParams.toString();
  };
  const tabParam = new URLSearchParams(location.search).get('tab');
  {
  }
  return (
    <div className={`${classes.root} p-4`}>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <NavLink
              to={getNewUrl('indicadores')}
              className={
                tabParam === 'indicadores'
                  ? `${classes.linkActive} `
                  : ` ${classes.link}`
              }
            >
              Indicadores
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink
              to={getNewUrl('anuarios')}
              className={
                tabParam === 'anuarios'
                  ? `${classes.linkActive} `
                  : ` ${classes.link}`
              }
            >
              Anuarios
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink
              to={getNewUrl('plantillas')}
              className={
                tabParam === 'plantillas'
                  ? `${classes.linkActive} `
                  : ` ${classes.link}`
              }
            >
              Plantilla
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink
              to={getNewUrl('configuracion')}
              className={
                tabParam === 'configuracion'
                  ? `${classes.linkActive} `
                  : ` ${classes.link}`
              }
            >
              Configuracion
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
