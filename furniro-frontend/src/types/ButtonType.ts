type ButtonType = {
    className?:string
    type?: 'submit' | 'reset'
    value?:string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default ButtonType