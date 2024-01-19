import { SearchBox } from "@fluentui/react-search-preview";
import { makeStyles,Field, Button,ButtonProps,Input,CompoundButton } from "@fluentui/react-components";
import { SearchBoxProps } from "@fluentui/react-search-preview";
import { Link } from 'react-router-dom';

import {
 Add24Filled,
 ArrowImport24Regular
} from "@fluentui/react-icons";
import Modal from "./Modal";

const useStyles = makeStyles({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row', // Alinear en fila (row)
    alignItems: 'center',
    justifyContent: 'space-between', // Espaciado entre elementos opuestos
    height: '32px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  btn:{
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#f8f8f8',
    backgroundColor: '#2271B1' ,
    marginLeft:"10px"
  
  },
  btnComponent:{
   fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    marginLeft:"10px",
    ":hover":{
      color:"#2271B1"
    }
  },
  icon:{
    ":hover":{
      color:"#2271B1"
    }
  }
});


export const SearchInput = ({type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
isAnuario}) => {
     const classes = useStyles();

    return (
       <div className="p-6">
          <Field label="">
              <div className={`${classes.searchContainer} ${classes.gap}`}>
                  <SearchBox
                      className={classes.searchBox}
                      appearance="outline"
                      size="medium"
                      placeholder={placeholder}
                      value={value}
                      onChange={onChange}
                      name={name}
                      type={type}
                      id={label}
                disabled={disabled}
                  />
                  
                  {/*  condicional para determinar la ruta */}
                 {
                    isAnuario ? (
                         <Link to="#">
                          <Button
                          appearance="subtle"
                          size='medium'
                              as='button'
                              icon={<Add24Filled className={classes.icon}/>}
                              className={classes.btnComponent}
                          >
                              Subir Anuario
                          </Button>
                          
                    </Link>
                    ):(
                         <Modal/>
                    )
                 }
                  
              </div>
          </Field>
          {error && <p className="error">Input filed can't be empty!</p>}
      </div>
    )
}