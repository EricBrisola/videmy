export type TextInputProps = {
  placeholder: string;
  id: string;
  name: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};
