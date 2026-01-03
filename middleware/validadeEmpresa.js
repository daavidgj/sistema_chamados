import Empresa from "../model/Empresa.js";

const validadeEmpresa = async (req, res, next) => {
    const empresa = await Empresa.findById(req.params.idEmpresa);
    if (!empresa) return res.status(400).json({ mensagem: "Empresa não encontrada" });
    next();
}
export default validadeEmpresa;