import React from 'react';
import PresentationSeriesConfigurationList from './PresentationSeriesConfigurationList';

const configuracionSeries = [
  { colorbackground: '#EB1E23', nombre: 'Áreas Naturales Protegidas' },
  { colorbackground: '#58595B', nombre: 'Áreas de Conservación Regional' },
  { colorbackground: '#0071BC', nombre: 'Áreas de Conservación Privada' },
  { colorbackground: '#05AFE0', nombre: 'Comunidades Campesinas Tituladas' },
  { colorbackground: '#23C1BB', nombre: 'Comunidades Nativas Tituladas' },
  {
    colorbackground: '#5ABA5B',
    nombre:
      'Reservas territoriales a favor de indigenas aislados en contacto inicial',
  },
  { colorbackground: '#009245', nombre: 'Concesión maderable' },
  { colorbackground: '#DDA63A', nombre: 'Concesión para reforestación' },
  {
    colorbackground: '#A21942',
    nombre: 'Concesión para otros productos del bosque - Castaña y Shiringa',
  },
  { colorbackground: '#FD6925', nombre: 'Concesión para conservación' },
  { colorbackground: '#B8171B', nombre: 'Concesión para ecoturismo' },
  {
    colorbackground: '#4E4E50',
    nombre: 'Concesión de área de manejo de fauna silvestre',
  },
  { colorbackground: '#045B95', nombre: 'Bosques de Producción Permanente' },
  { colorbackground: '#0383A8', nombre: 'Predios Rurales' },
  { colorbackground: '#1A9994', nombre: 'Humedales en la Amazonía' },
  { colorbackground: '#438843', nombre: 'No Categorizado' },
  { colorbackground: '#C55420', nombre: 'TOTAL' },
];

function PresentationSeriesConfiguration() {
  return (
    <div>
      <p>Configuracion de series</p>
      <div className="w-11/12 bg-white rounded-lg  my-5 ">
        <div className="flex-1 ">
          {configuracionSeries.map((item) => (
            <PresentationSeriesConfigurationList
              key={item.colorbackground}
              color={item.colorbackground}
              nombre={item.nombre}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PresentationSeriesConfiguration;
