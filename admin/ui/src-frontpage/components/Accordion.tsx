import { useEffect, useRef, useState } from 'react';
import { ChevronDown24Filled } from '@fluentui/react-icons';
import './accordion.scss';
const Accordion = ({
  title,
  numero,
  colorBg,
  colorText = '#fff',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      expand();
    } else {
      shrink();
    }
  }, [isOpen]);

  const handleToggle = (e) => {
    e.preventDefault();
    if (!isAnimating) {
      setIsOpen(!isOpen);
    }
  };

  const shrink = () => {
    setIsAnimating(true);
    const startHeight = `${contentRef.current.offsetHeight}px`;
    const endHeight = `${summaryRef.current.offsetHeight}px`;

    const animation = contentRef.current.animate(
      { height: [startHeight, endHeight] },
      { duration: 200, easing: 'ease-out' }
    );

    animation.onfinish = () => {
      setIsAnimating(false);
      contentRef.current.style.height = '';
      contentRef.current.style.overflow = '';
    };

    animation.oncancel = () => {
      setIsAnimating(false);
    };
  };

  const expand = () => {
    setIsAnimating(true);
    const startHeight = `${contentRef.current.offsetHeight}px`;
    const endHeight = `${
      summaryRef.current.offsetHeight + contentRef.current.scrollHeight
    }px`;

    const animation = contentRef.current.animate(
      { height: [startHeight, endHeight] },
      { duration: 200, easing: 'ease-out' }
    );

    animation.onfinish = () => {
      setIsAnimating(false);
      contentRef.current.style.height = '';
      contentRef.current.style.overflow = '';
    };

    animation.oncancel = () => {
      setIsAnimating(false);
    };
  };

  return (
    <details
      className="item-details"
      open={isOpen}
      style={{ overflow: 'hidden', backgroundColor: colorBg }}
      ref={contentRef}
    >
      <summary onClick={handleToggle} ref={summaryRef} className="">
        <div className="flex justify-between items-center">
          <div className="item-content">
            <span className="font-bold mr-2" style={{ color: colorText }}>
              {numero}
            </span>
            <p className="inline text-white" style={{ color: colorText }}>
              {title}
            </p>
          </div>
          <ChevronDown24Filled
            className={`icon expand-icon ${isOpen ? 'open' : ''}`}
            style={{
              color: colorText,
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-out',
              stroke: colorText,
            }}
          />
        </div>
      </summary>
      <div className="faq-content">{children}</div>
    </details>
  );
};

export default Accordion;
