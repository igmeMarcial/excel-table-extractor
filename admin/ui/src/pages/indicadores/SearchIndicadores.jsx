import React, { useState } from 'react';
import { SearchBox } from '@fluentui/react-search-preview';
import { makeStyles, Field } from '@fluentui/react-components';
import ButtonsIndicadores from './ButtonsIndicadores';

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

function SearchIndicadores({ isIndicadores }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(true);

  const onChange = (ev, data) => {
    if (data.value.length <= 100) {
      setValue(data.value);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <div className="p-4">
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
          <div>
            <ButtonsIndicadores />
          </div>
        </div>
      </Field>
    </div>
  );
}

export default SearchIndicadores;
