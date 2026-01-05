import yup from "yup";

const yupStore = yup.object().shape({
    nome: yup.string().typeError('O nome deve ser do tipo Texto').required('O nome é obrigatório').min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: yup.string().typeError('O e-mail deve ser do tipo Texto').email('Informe um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().typeError('A senha deve ser do tipo Texto').required('A senha é obrigatória').min(6, "A senha deve ter no mínimo 6 caracteres"),
})

const yupUpdate = yup.object().shape({
    nome: yup.string().typeError('O nome deve ser do tipo Texto').min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: yup.string().typeError('O e-mail deve ser do tipo Texto').email('Informe um e-mail válido'),
    password: yup.string().typeError('A senha deve ser do tipo Texto').min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export default { yupStore, yupUpdate };