import React, { useRef, useState } from 'react';
import { IosArrowRtl24Filled, ChevronDownFilled } from '@fluentui/react-icons';
import './mdea.scss';

export const SideNavOds = ({ title, color, number, img, children }) => {
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
        <span className="faq-title">{title}</span>
        <div>
          <img src={img} style={{ width: '100px', height: '40px' }} />
        </div>
        <div>
          <IosArrowRtl24Filled style={{ color: 'white' }} />
        </div>
      </summary>
      <div className="faq-content">{children}</div>
    </details>
  );
};
