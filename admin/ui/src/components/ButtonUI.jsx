import React from 'react'
import { Button } from "@fluentui/react-components";
import  { ButtonProps } from "@fluentui/react-components";

function ButtonUI({type,variant,classNameComponent,id,onClick,children,size}) {
  return (
    <Button type={type ? type : "button"} appearance={variant} className={classNameComponent} id={id} onClick={onClick} size={size ? size : "medium"} >{children}</Button>

  )
}

export default ButtonUI