import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { makeStyles, CompoundButton } from "@fluentui/react-components";
import { columnsTestAnuarios, itemsTestAnuarios } from '../../utils/data';
import TableAnuario from './TableAnuario';
import { SearchInput } from '../../components/SearchInput';

const useStyles = makeStyles({
  wrapper: {
    alignItems: "center",
    columnGap: "15px",
    display: "flex",
  },
});


function Anuarios() {
  const styles = useStyles();
  const[value,setValue] = useState("");
  // lo onClick estan de prueba para manipular cada boton
  const OnClickSubirAnuario= ()=>{
  console.log("Diste Click a un button subirAnuario")
}

  return (
    <MainLayout>
      <SearchInput
        type="search"
        label="inputIndicador"
        value={value}
        name="inputIndicador"
        placeholder="Buscar"
        error={false}
        disabled={false}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        isAnuario={true}
      />
      <TableAnuario
        items={itemsTestAnuarios}
        columns={columnsTestAnuarios}
      ></TableAnuario>
    </MainLayout>
  );
}

export default Anuarios