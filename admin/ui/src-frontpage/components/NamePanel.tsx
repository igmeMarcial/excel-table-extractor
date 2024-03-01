import React from 'react';

const namePanels = [
  { name: 'Condiciones y Calidad Ambiental', color: '#0071BC' },
  { name: 'Recursos Ambientales y su Uso', color: '#07C4EC' },
  { name: 'Residuos', color: '#07C4EC' },
  { name: 'Eventos Extremos y Desastres', color: '#07C4EC' },
  { name: 'Asentamientos Humanos y Salud Ambiental', color: '#07C4EC' },
  { name: 'Protección, Gestión y Conciencia Ambiental', color: '#07C4EC' },
];

const Panel = ({ name, color }) => {
  return (
    <div
      className=" p-2 rounded-lg mb-4 h-20 sm:h-10 md:h-14 lg:h-18 xl:h-20  flex justify-center text-center items-center"
      style={{ background: color }}
    >
      <h4 className="font-normal text-white text-sm sm:text-sm md:text-base lg:text-base xl:text-base leading-tight">{name}</h4>
    </div>
  );
};

function NamePanel() {
  return (
    <div className='grid grid-cols-6 gap-4 my-10'>
      {namePanels.map((panel, index) => (
        <Panel key={index} name={panel.name} color={panel.color} />
      ))}
    </div>
  );
}

export default NamePanel;
