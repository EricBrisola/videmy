export type TextInputProps = {
  inputName: string;
  placeholder: string;
  id: string;
  name: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
