import React, { useState} from 'react'
import {
  useModalAttributes,
  useFocusFinders,
  makeStyles,
  shorthands,
  Button,
  tokens,
  Title2,
  CompoundButton
} from "@fluentui/react-components";
import FileUploadSingle from './FileUploadSingle';
import {
 Add24Filled,
} from "@fluentui/react-icons";



const useStyles = makeStyles({
  dialog: {
    position: "fixed",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.inset(0),
    ...shorthands.padding("10px"),
    ...shorthands.margin("auto"),
    ...shorthands.borderStyle("none"),
    ...shorthands.overflow("unset"),
    boxShadow: tokens.shadow16,
    width: "450px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    zIndex:"999"
  },

  footer: {
    display: "flex",
    marginTop: "auto",
    justifyContent: "end",
    ...shorthands.gap("5px"),
  },
  btnComponent:{
   fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    marginLeft:"10px",
     ":hover":{
      color:"#2271B1"
    }
  }
});


function Modal() {

    const styles = useStyles();
  const [open, setOpen] =useState(false);
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
    if (e.key === "Escape") {
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
        appearance="subtle"
        size="medium"
        as="button"
        icon={<Add24Filled />}
        className={styles.btnComponent}
        ref={triggerRef}
        {...triggerAttributes}
        onClick={onClickTrigger}
      >
        Subir plantilla
      </Button>

      {/* <Button appearance='secondary' ref={triggerRef} {...triggerAttributes} onClick={onClickTrigger}>
        Subir Plantilla
      </Button> */}
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
          <Title2 as="h2">Subir archivo word</Title2>
          <div>
            <FileUploadSingle />
          </div>
          <div className={styles.footer}>
            <Button>Subir</Button>
            <Button onClick={onClickClose}>Cerrar</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal