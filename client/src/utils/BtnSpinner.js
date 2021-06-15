import React from 'react';

const BtnSpinner = ({show,className}) => {
  return show ? (
        <div className={`btn__spinner ${className}`}></div>
  ): ("")
}

export default BtnSpinner;