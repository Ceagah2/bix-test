import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Formato de email inválido"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "A senha deve conter pelo menos um caractere especial"
    ),
});

export default loginSchema;
