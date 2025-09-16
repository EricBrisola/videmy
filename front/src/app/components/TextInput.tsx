import { TextInputProps } from "@/types/textInputProps";

const TextInput = ({ name, placeholder, value }: TextInputProps) => {
  return (
    <input type="text" placeholder={placeholder} name={name} value={value} />
  );
};

export default TextInput;
