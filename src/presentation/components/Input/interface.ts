
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  type: string;
  placeholder: string;
  register: (name: string) => UseFormRegisterReturn<string>; 
  error?: string;
  name: string;
}

