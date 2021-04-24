import React from 'react';

const Toast = ({show,color,background,className,error}) => {
  return show !== "" ? (
     <div style={{color,background}} className={`toast ${className}`}>
         {error ? <i className="fas fa-window-close"></i> : <i className="fas fa-badge-check"></i>}&nbsp;{show}
     </div>
  ) : ""
}

export default Toast;