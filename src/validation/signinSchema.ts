import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
    .matches(/\d/, "A senha deve conter pelo menos 1 número")
    .matches(
      /[!@#$%^&*]/,
      "A senha deve conter pelo menos 1 caractere especial"
    )
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais")
    .required("A confirmação de senha é obrigatória"),
});
