import ButtonType from "../types/ButtonType"

const Button:React.FC<ButtonType> = (props) =>{
    return(
        <>
          <button type={props.type} value={props.value} className={props.className}>{props.value}</button>
        </>
    )
}

export default Button