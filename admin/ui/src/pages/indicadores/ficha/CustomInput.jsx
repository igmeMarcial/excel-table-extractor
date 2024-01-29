import React, { useState } from 'react'
const CustomInput = (props) => {
    return (
          <input
            className="regular-text"
            onBlur={props.handleBlur}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            required
          />
    );
}


export default CustomInput