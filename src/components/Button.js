const Button = (props) => {
  return(
    <div className="financial-button">
      <a id={props.name} className={props.active === 'yes' ? 'financial-button-active' : ''} onClick={(e) => props.onClick(e)}>{props.name}</a>
    </div>
  )
}

export default Button;