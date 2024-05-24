import { useEffect, useRef, useState } from 'react';
import { ChevronDown24Filled } from '@fluentui/react-icons';
import './mdea.css';
import { IndiceEstadisticas } from '../../src/core/IndiceEstadisticas';
import { OBJETIVOS_ODS } from '../../src/config/colors';
import Accordion from './Accordion';

let urlIcon = window.AesaInfo.pluginUrl + '/public/assets/images/ods/';
interface SideNavMdeaProps {
  indiceEstadisticas: IndiceEstadisticas;
}

const ItemEstadistica = ({ item, textColor = '#fff' }) => {
  return (
    <ul className="list-disc list-inside pl-8 my-2">
      <li style={{ color: textColor }} className="text-[14px] leading-5">
        {item}
      </li>
    </ul>
  );
};

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
      className="accordion-item text-base mx-auto w-full relative max-w-[37rem] transition-all duration-300 ease-in-out"
      open={isOpen}
      ref={contentRef}
      style={{ overflow: 'hidden', backgroundColor: color }}
    >
      <summary onClick={handleToggle} ref={summaryRef}>
        <div className="text-white text-[40px] mr-3">{number}</div>
        <span className="faq-title  whitespace-pre-line">{title}</span>
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
            style={{
              color: 'white',
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </summary>
      <div
        className={`faq-content p-0 border-2 border-solid`}
        style={{ borderColor: color }}
      >
        {children}
      </div>
    </details>
  );
};

export const SideNavOds = ({ indiceEstadisticas }: SideNavMdeaProps) => {
  const itemsNivel1 = indiceEstadisticas.getItemsNivel1();
  const ods = OBJETIVOS_ODS;

  return (
    <div className="faq-container">
      {itemsNivel1.map((item) => (
        <AsideItem
          key={item.numeral}
          title={ods[item.numeral].nombre}
          color={ods[item.numeral].color}
          img={`${urlIcon}ods${item.numeral}.svg`}
          number={item.numeral}
        >
          {indiceEstadisticas.getDirectChildren(item).map((filteredItem) => (
            <Accordion
              key={filteredItem.numeral}
              title={filteredItem.nombre}
              numero={filteredItem.numeral}
              colorBg={'#fff'}
              colorText="#000"
            >
              {indiceEstadisticas
                .getDirectChildren(filteredItem)
                .map((estaditica) => (
                  <ItemEstadistica
                    key={estaditica.estadisticaId}
                    item={estaditica.nombre}
                    textColor="#000"
                  />
                ))}
            </Accordion>
          ))}
        </AsideItem>
      ))}
    </div>
  );
};
