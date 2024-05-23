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

const AsideItemEstadistica = ({ numeral, nombre, color, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef(null);
  const summaryRef = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    if (!isAnimating) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <details
      className="accordion"
      open={isOpen}
      style={{ overflow: 'hidden', backgroundColor: color }}
      ref={contentRef}
    >
      <summary onClick={handleToggle} ref={summaryRef} className="py-0">
        <div className="mb-[20px] ">
          <span className="font-bold mr-2 ">{numeral}</span>
          <p className="inline font-normal">{nombre}</p>
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
        <div className="text-white text-[40px]   mr-3">{number}</div>
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
      <div className="faq-content p-0">{children}</div>
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
              color={ods[item.numeral].color}
            >
              <div className="py-2 px-4">Estaditica 1</div>
              <div className="py-2 px-4">Estaditica 2</div>
              <div className="py-2 px-4">Estaditica 3</div>
            </Accordion>
          ))}
        </AsideItem>
      ))}
    </div>
  );
};
