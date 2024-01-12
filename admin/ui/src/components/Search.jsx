import React, { useState } from 'react'
import { SearchBox } from "@fluentui/react-search-preview";
import { makeStyles,Field, Button,ButtonProps,Input } from "@fluentui/react-components";
import { SearchBoxProps } from "@fluentui/react-search-preview";
import ButtonUI from "./ButtonUI"
import { Link } from 'react-router-dom';
import Modal from './Modal';

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
  btn:{
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#f8f8f8',
    backgroundColor: '#2271B1',
  
  }
});

function Search({ isIndicadores }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  
const onClickBtn=()=>{

}

  const onChange = (ev, data) => {
    if (data.value.length <= 100) {
      setValue(data.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return  (
    <div className="p-6">
      <Field label="">
        <div className={`${classes.searchContainer} ${classes.gap}`}>
          <SearchBox
            className={classes.searchBox}
            appearance="outline"
            size="medium"
            placeholder="Buscar"
            value={value}
            onChange={onChange}
          />
           {/*  condicional para determinar la ruta */}
          {isIndicadores ? (
            <Link to="/indicadores/editar">
              <Button className={classes.btn} appearance='secondary' size='medium'>
                Registrar
              </Button>
            </Link>
          ) : (
            
            <Modal/>
          )}
          
          {/* <ButtonUI variant="secondary" classNameComponent="" id="btnRegisterIndicador" onClick={onClickBtn} children="Registrar" size="medium"/> */}
        </div>
      </Field>
      
     
    </div>
  );
}

export default Search