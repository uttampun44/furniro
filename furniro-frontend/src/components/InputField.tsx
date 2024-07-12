import Input from "../types/Inputfield";

const InputField: React.FC<Input> = (props) => {
  return (
    <>
      {props.label && (
        <label className={props.className?.label} htmlFor={props.name}>{props.label}</label>
      )}

      <input
        type={props.type}
        className={props.className.input}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        name={props.name}
      onChange={props.onChange}
      />
    </>
  );
};
export default InputField;
