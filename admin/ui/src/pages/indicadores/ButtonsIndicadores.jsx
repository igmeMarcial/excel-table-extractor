import React, { useRef, useState } from 'react'
import { makeStyles,Field, Button } from "@fluentui/react-components";
import { Link } from 'react-router-dom';
import {
 Add24Filled,
 ArrowImport24Regular,
 MoreVertical24Filled
} from "@fluentui/react-icons";
import ModalIndicadores from './ModalIndicadores';



const useStyles = makeStyles({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row', // Alinear en fila (row)
    alignItems: 'center',
    justifyContent: 'space-between', // Espaciado entre elementos opuestos
    height: '32px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  btn: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#f8f8f8',
    backgroundColor: '#2271B1',
    marginLeft: '10px',
  },
  btnComponent: {
    paddingLeft: '0',
    // paddingRight:"0",
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    marginLeft: '10px',
    ':hover': {
      color: '#2271B1',
    },
  },
  icon: {
    ':hover': {
      color: '#2271B1',
    },
  },
});

function ButtonsIndicadores() {
  const classes = useStyles();

  return (
    <>
      <Link to="/indicadores/editar">
        <Button
          style={{ color: '#2271B1' }}
          size="medium"
          className={classes.btnComponent}
          appearance="subtle"
          icon={
            <Add24Filled
              style={{ color: '#2271B1' }}
              className={classes.icon}
            />
          }
        >
          Registrar
        </Button>
      </Link>
      <ModalIndicadores/>
      <Button
        appearance="subtle"
        size="medium"
        as="button"
        icon={<MoreVertical24Filled className={classes.icon} />}
        className={classes.btnComponent}
      ></Button>
    </>
  );
}

export default ButtonsIndicadores