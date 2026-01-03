import Funcionario from "../model/Funcionario.js";

const validateFuncionario = async (req, res, next) => {
    const funcionario = await Funcionario.findById(req.params.idFuncionario);
    if (!funcionario) return res.status(400).json({ mensagem: "Funcionario não encontrado" });
    next();
}
export default validateFuncionario;