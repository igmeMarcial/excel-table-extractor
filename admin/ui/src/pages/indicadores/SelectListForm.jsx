import React from 'react';
import { makeStyles, shorthands, Select } from '@fluentui/react-components';
import { useFetch } from '../../hooks/useFetch';

function SelectListForm({ styles, title, data, handleChange, value }) {
  //   console.log(data);
  return (
    <>
      <Select
        name={title}
        id={title}
        className={styles.selectInput}
        onChange={handleChange}
        value={value}
        appearance="outline"
      >
        {data.map((option, index) => (
          <option key={index}>{option.nombre}</option>
        ))}
      </Select>
    </>
  );
}

export default SelectListForm;
