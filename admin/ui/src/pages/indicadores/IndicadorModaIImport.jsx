import React, { useState } from 'react';
import {
  useModalAttributes,
  useFocusFinders,
  makeStyles,
  shorthands,
  Button,
  tokens,
  Title2,
} from '@fluentui/react-components';
import { ArrowImport24Regular } from '@fluentui/react-icons';
import MultipleFileUploader from './IndicadorMultipleFileUploader';

const useStyles = makeStyles({
  dialog: {
    position: 'fixed',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.inset(0),
    ...shorthands.padding('10px'),
    ...shorthands.margin('auto'),
    ...shorthands.borderStyle('none'),
    ...shorthands.overflow('unset'),
    boxShadow: tokens.shadow16,
    width: '650px',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '999',
    paddingLeft: '24px',
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
  },

  footer: {
    display: 'flex',
    marginTop: 'auto',
    justifyContent: 'start',
    ...shorthands.gap('5px'),
  },
  btnComponent: {
    paddingLeft: '0',
    // paddingRight:"0",
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    marginLeft: '10px',
    ':hover': {
      color: '#2271B1',
    },
  },
  icon: {
    ':hover': {
      color: '#2271B1',
    },
  },
  title: {
    lineHeight: '28px',
    fontWeight: '600',
    fontSize: '20px',
    marginTop: '0px',
    marginBottom: '0px',
  },
  btnImport: {
    backgroundColor: '#B8B8B8',
  },
});

function ModalIndicadores() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const { triggerAttributes, modalAttributes } = useModalAttributes({
    trapFocus: true,
  });
  const { findFirstFocusable } = useFocusFinders();
  const triggerRef = React.useRef(null);
  const dialogRef = React.useRef(null);
  const onClickTrigger = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onDialogKeydown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  React.useEffect(() => {
    if (open && dialogRef.current) {
      findFirstFocusable(dialogRef.current)?.focus();
    }
  }, [open, findFirstFocusable]);

  return (
    <>
      <Button
        size="medium"
        className={styles.btnComponent}
        appearance="subtle"
        icon={<ArrowImport24Regular className={styles.icon} />}
        ref={triggerRef}
        {...triggerAttributes}
        onClick={onClickTrigger}
      >
        Importar
      </Button>
      {open && (
        <div
          onKeyDown={onDialogKeydown}
          ref={dialogRef}
          {...modalAttributes}
          aria-modal="true"
          role="dialog"
          className={styles.dialog}
          aria-label="Example dialog"
        >
          <Title2 as="h5" className={styles.title}>
            Importar indicadores
          </Title2>

          <MultipleFileUploader />

          <div className={styles.footer}>
            <Button className={styles.btnImport}>Importar</Button>
            <Button onClick={onClickClose}>Cancelar</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalIndicadores;
