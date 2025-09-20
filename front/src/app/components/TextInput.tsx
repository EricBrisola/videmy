import { TextInputProps } from "@/types/textInputProps";

const TextInput = ({
  name,
  placeholder,
  id,
  onChange,
  value,
}: TextInputProps) => {
  return (
    <label htmlFor={id} className="flex w-full flex-col gap-3">
      <p className="leading-none font-medium">{placeholder}</p>
      <input
        className="border-gray focus:border-highlight-blue w-full rounded-md border-[1px] px-4 py-3 outline-none"
        type="text"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

export default TextInput;
