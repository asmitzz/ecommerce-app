import React from 'react';

const SuccessToast = ({show,color,background,className}) => {
  return show !== "" ? (
     <div style={{color,background}} className={`success__toast ${className}`}>
        <i className="fas fa-badge-check"></i> &nbsp;{show}
     </div>
  ) : ""
}

export default SuccessToast;