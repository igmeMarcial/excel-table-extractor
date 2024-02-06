import React, { useState } from 'react';
const Input = (props) => {
  return (
    <input
      className="regular-text -z-10 w-full"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      required
    />
  );
};

export default Input;
