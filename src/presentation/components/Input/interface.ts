
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  error?: string;
}

