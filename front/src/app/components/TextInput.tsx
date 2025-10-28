import { TextInputProps } from "@/types/textInputProps";

const TextInput = ({
  name,
  placeholder,
  inputName,
  id,
  onChange,
  value,
}: TextInputProps) => {
  return (
    <label htmlFor={id} className="flex w-full flex-col gap-3">
      <p className="leading-none font-medium lg:text-lg">{inputName}</p>
      <input
        className="border-gray focus:border-highlight-blue w-full rounded-md border-[1px] px-4 py-3 outline-none"
        type="text"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required
      />
    </label>
  );
};

export default TextInput;
