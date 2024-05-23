import { useRef, useState } from 'react';
import { ChevronDown24Filled } from '@fluentui/react-icons';
import './mdea.scss';
import { IndiceItem } from '../types/IndiceItem';
import { IndiceEstadisticas } from '../../src/core/IndiceEstadisticas';
import { OBJETIVOS_ODS } from '../../src/config/colors';

let urlIcon = window.AesaInfo.pluginUrl + '/public/assets/images/ods/';
interface SideNavMdeaProps {
  indiceEstadisticas: { items: IndiceItem[] };
}
const AsideItem = ({ title, color, number, img, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef(null);
  const summaryRef = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);
    const contentHeight = contentRef.current.scrollHeight;
    const summaryHeight = summaryRef.current.offsetHeight;
    if (isOpen) {
      contentRef.current.style.height = `${contentHeight}px`;
      requestAnimationFrame(() => {
        contentRef.current.style.height = `${summaryHeight}px`;
      });
    } else {
      contentRef.current.style.height = `${summaryHeight}px`;
      requestAnimationFrame(() => {
        contentRef.current.style.height = `${contentHeight + summaryHeight}px`;
      });
    }

    setTimeout(() => {
      setIsOpen(!isOpen);
      setIsAnimating(false);
      contentRef.current.style.height = '';
    }, 200);
  };

  return (
    <details
      className="accordion"
      open={isOpen}
      ref={contentRef}
      style={{ overflow: 'hidden', backgroundColor: color }}
    >
      <summary onClick={handleToggle} ref={summaryRef}>
        <div className="text-3xl text-white mr-3">{number}</div>
        <span className="faq-title whitespace-pre-line">{title}</span>
        <div>
          <img
            alt={title}
            src={img}
            style={{ width: '100px', height: '40px', objectFit: 'contain' }}
          />
        </div>
        <div>
          <ChevronDown24Filled
            className="icon expand-icon"
            style={{ color: 'white' }}
          />
        </div>
      </summary>
      <div className="faq-content">{children}</div>
    </details>
  );
};

export const SideNavOds = ({ indiceEstadisticas }: SideNavMdeaProps) => {
  const indice = new IndiceEstadisticas(indiceEstadisticas.items);
  const itemsNivel1 = indice.getItemsNivel1();
  const ods = OBJETIVOS_ODS;
  const itemsNive2 = indice.getItemsNivel2();

  const filterNivel = (arr: IndiceItem[], numeral: string) => {
    return arr.filter((item) => {
      const regexp = new RegExp(`^${numeral}\\.`);
      return regexp.test(item.numeral);
    });
  };
  return (
    <div className="faq-container">
      {itemsNivel1.map((item, index) => (
        <AsideItem
          key={item.numeral}
          title={ods[index].nombre}
          color={ods[index].color}
          img={`${urlIcon}ods${index + 1}.svg`}
          number={index + 1}
        >
          {filterNivel(itemsNive2, item.numeral).map((filteredItem, index) => (
            <div className="mb-[20px] " key={filteredItem.numeral}>
              <span className="font-bold mr-2">{filteredItem.numeral}</span>
              <p className="inline">{filteredItem.nombre}</p>
              <br />
            </div>
          ))}
        </AsideItem>
      ))}
    </div>
  );
};
