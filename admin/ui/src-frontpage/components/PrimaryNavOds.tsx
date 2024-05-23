import React from 'react';
import { OBJETIVOS_ODS } from '../../src/config/colors';
import { SideNavOds } from './SideNavOds';
import './mdea.scss';

const icono = window.AesaInfo.pluginUrl + '/public/assets/images/ods/ods1.svg';

function PrimaryNavOds({ indiceEstadisticas }) {
  const isNumberInt = (str) => {
    const numero = parseInt(str);
    if (!isNaN(numero) && Number.isInteger(numero)) {
      return true;
    } else {
      return false;
    }
  };
  const intemsNivel1 = indiceEstadisticas.getItemsNivel1();
  return (
    <div className="faq-container">
      {intemsNivel1.map((ods, index) => (
        <SideNavOds
          key={ods.numeral}
          title={ods.nombre}
          color="#E5243B"
          img={icono}
          number={index + 1}
        >
          {ods.nombre}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
          molestiae nobis, eligendi porro nostrum sunt consequuntur repellendus?
          Molestias nisi saepe quis officiis exercitationem, architecto illum
          itaque expedita beatae, veritatis aspernatur?
        </SideNavOds>
      ))}
    </div>
  );
}

export default PrimaryNavOds;
