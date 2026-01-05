import yup from "yup";


const yupEmpresa = yup.object().shape({
    nome: yup.string().typeError('O nome deve ser do tipo Texto').required('O nome é obrigatório').min(3, "O nome deve ter no mínimo 3 caracteres"),
})

export default yupEmpresa;

