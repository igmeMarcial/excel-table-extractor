import { OBJETIVOS_OCDE } from '../../src/config/colors';
import { IndiceEstadisticas } from '../../src/core/IndiceEstadisticas';
import Accordion from './Accordion';

interface SideNavMdeaProps {
  indiceEstadisticas: IndiceEstadisticas;
}

function PrimaryNavOcde({ indiceEstadisticas }: SideNavMdeaProps) {
  const itemsNivel1 = indiceEstadisticas.getItemsNivel1();

  return (
    <div className="faq-container">
      {itemsNivel1.map((item) => (
        <Accordion
          key={item.numeral}
          title={item.nombre}
          numero={item.numeral}
          color="#004b78"
        >
          {indiceEstadisticas.getDirectChildren(item).map((filteredItem) => (
            <Accordion
              key={filteredItem.numeral}
              title={filteredItem.nombre}
              numero={filteredItem.numeral}
              color="#7098b1"
            >
              <div className="py-2 px-4">Estaditica 1</div>
              <div className="py-2 px-4">Estaditica 2</div>
              <div className="py-2 px-4">Estaditica 3</div>
            </Accordion>
          ))}
        </Accordion>
      ))}
    </div>
  );
}

export default PrimaryNavOcde;
