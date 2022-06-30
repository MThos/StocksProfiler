import React from 'react';

const Button = (props) => {
  return(
    <div className="financial-button">
      <button id={props.name} className={props.active === 'yes' ? 'financial-button-active' : ''} onClick={(e) => props.onClick(e)}>{props.name}</button>
    </div>
  )
}

export default Button;