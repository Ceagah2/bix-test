export interface InputProps {
  type: string;
  placeholder: string;
  register: () => object;
  error?: string;
}