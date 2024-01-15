import React from 'react'
import {
  makeStyles,
  Body1,
  Caption1,
  Button,
  shorthands,
} from "@fluentui/react-components";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
  root: {
    backgroundColor: '#2271B1', // Fondo gris
    // padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginLeft:"auto",
    // marginRight:"auto",
    // textAlign:"center",
    // placeItems:"center",
    // alignItems:"center",
    // justifyContent:"center"
  
  },
  nav: {
    // height: '40px', // Altura
    // padding: '5px 16px 5px 16px', // Relleno
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ul: {
    listStyleType: 'none',
    // margin: 0,
    // padding: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  li: {
    marginRight: '20px',
    width: '83px', // Ancho
    // height: '30px', // Altura
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'space-between', // Alinear elementos internos
    
  },
  link: {
    
    color: '#CFE4FA', // Puedes ajustar el color del texto según tus necesidades
    fontFamily: 'Segoe UI', // Agrega la fuente Segoe UI
    fontWeight: 400, // Peso de la fuente
    fontSize: '14px', // Tamaño de la fuente
    lineHeight: '17.29px', // Altura de línea
    textDecorationLine: 'none',
    color: '#CFE4FA',
    
  },
});

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} p-4`}>
     
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <Link to="/indicadores" className={classes.link}>
              Indicadores
            </Link>
          </li>
          <li className={classes.li}>
            <Link to="/anuarios" className={classes.link}>
              Anuarios
            </Link>
          </li>
          <li className={classes.li}>
            <Link to="/plantilla" className={classes.link}>
              Plantilla
            </Link>
          </li>
          <li className={classes.li}>
            <Link to="/configuracion" className={classes.link }>
              Configuracion
            </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}