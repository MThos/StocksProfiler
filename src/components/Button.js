import React from 'react';

const Button = (props) => {
  return(
    <div className="option-button">
      <button id={props.name} className={props.active === 'yes' ? 'option-button-active' : ''} onClick={(e) => props.onClick(e)}>{props.displayText}</button>
    </div>
  )
}

export default Button;