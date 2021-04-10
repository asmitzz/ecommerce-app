import React from 'react';

const SuccessToast = ({show,color,background,className}) => {
  return show !== "" ? (
     <div style={{color,background}} className={`success__toast ${className}`}>
        <i className="fa fa-check-circle"></i> {show}
     </div>
  ) : ""
}

export default SuccessToast;