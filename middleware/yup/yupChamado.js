import yup from "yup";

const yupStore = yup.object().shape({
    titulo: yup.string().typeError('O titulo deve ser do tipo Texto').required('O titulo é obrigatório').min(3, "O titulo deve ter no mínimo 3 caracteres"),
    descricao: yup.string().typeError('A descrição deve ser do tipo Texto').required('A descrição é obrigatória').min(12, "A descrição deve ter no mínimo 12 caracteres"),
})

const yupUpdate = yup.object().shape({
    status: yup.string().typeError('O status deve ser do tipo Texto').required('O status é obrigatório'),
})

export default { yupStore, yupUpdate };