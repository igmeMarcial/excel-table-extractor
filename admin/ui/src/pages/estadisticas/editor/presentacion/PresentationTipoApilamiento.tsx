import { Button, makeStyles } from "@fluentui/react-components";
import { useState } from "react";
type TypeName= {
    
};
const useStyles = makeStyles({
  active: { backgroundColor: '#E6E6E6' },
});
const  TipoApilamiento:React.FC<TypeName> = () => {
     const classes = useStyles();
    const [type,setType]= useState('normal');
    const handleType =(type:string)=>{
        setType(type)
    }
    return <div>
      <p>Tipo de apilamiento</p>
      <Button className={type === 'normal' ? classes.active : ''} appearance="subtle" onClick={()=>handleType('normal')}>
        Normal
      </Button>
      <Button className={type === 'porcentaje' ? classes.active : ''} appearance="subtle" onClick={()=>handleType('porcentaje')}>
        Porcentaje
      </Button>
    </div>

}
export default TipoApilamiento;