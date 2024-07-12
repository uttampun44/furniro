type Input = {
    name?:string
    label?:string,
    className:{
        label?:string
        input?:string
    }
    placeholder?:string
    required?:boolean
    value?:string | number
    type?: 'file' | 'text' | 'email' | 'password' | 'checkbox'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default Input