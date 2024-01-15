import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import ButtonUI from '../components/ButtonUI'
import { makeStyles, CompoundButton } from "@fluentui/react-components";
import TableUI from '../components/TableUI';
import { columnsTestAnuarios, itemsTestAnuarios } from '../utils/data';
import TableAnuario from '../components/TableAnuario';
import { SearchInput } from '../components/SearchInput';

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
          {/* <div className="flex flex-col md:flex-row md:items-center justify-between py-8 px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-20">
                  <div className="">
                      <h2 className="text-2xl md:text-3xl font-bold">
                          Anuarios
                      </h2>
                  </div>
                  <div className="">
                      <div className={styles.wrapper}>
                          <ButtonUI
                              variant="secondary"
                              classNameComponent="text-blue-500 "
                              id="btnSubirAnuario"
                              onClick={OnClickSubirAnuario}
                              size="large"
                          >
                              Subir Anuario
                          </ButtonUI>
                          <ButtonUI
                              variant="secondary"
                              classNameComponent="text-blue-500"
                              id="btnGenerarVerion"
                              onClick={() => console.log("btnGenerarVersion")}
                              size="large"
                          >
                              Generar versión de base
                          </ButtonUI>
                      </div>
                  </div>
              </div>

              <div className="">
                  <ButtonUI
                      variant="primary"
                      classNameComponent="text-blue-500 bg-blue-500"
                      id="btnEliminar"
                      onClick={() => console.log("btnDelete")}
                      size="large"
                  >
                      Borrar
                  </ButtonUI>
              </div>
          </div>*/}
    <SearchInput type="search" label="inputIndicador" value={value} name="inputIndicador" placeholder="Buscar" error={false} disabled={false} onChange={(e)=>{setValue(e.target.value)}} isAnuario={true}/>
         <TableAnuario items={itemsTestAnuarios} columns={columnsTestAnuarios}></TableAnuario> 
      </MainLayout>
  );
}

export default Anuarios