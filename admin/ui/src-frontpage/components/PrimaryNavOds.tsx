import React from 'react';
import { SideNavOds } from './SideNavOds';
import './mdea.scss';

function PrimaryNavOds({ indiceEstadisticas }) {
  console.log(indiceEstadisticas);
  return <SideNavOds indiceEstadisticas={indiceEstadisticas} />;
}

export default PrimaryNavOds;
