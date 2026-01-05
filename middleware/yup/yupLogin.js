import yup from "yup";


const yupStore = yup.object().shape({
    email: yup.string().typeError('O e-mail deve ser do tipo Texto').email('Informe um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().typeError('A senha deve ser do tipo Texto').required('A senha é obrigatória').min(6, "A senha deve ter no mínimo 6 caracteres"),
})


export default { yupStore };

