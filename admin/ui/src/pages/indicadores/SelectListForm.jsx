import React, { useState } from 'react';
import { makeStyles, shorthands, Select } from '@fluentui/react-components';
import { useFetch } from '../../hooks/useFetch';

function SelectListForm({ title, url, handleChange, styles, data }) {
  // const [db, setDb] = useState(null);
  // const { data, error, loading } = useFetch(url);
  //console.log(data, error, loading);

  if (!data) return null;

  return (
    <>
      <Select
        name={title}
        id={title}
        className={styles.selectInput}
        onChange={handleChange}
        // value={value}
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
