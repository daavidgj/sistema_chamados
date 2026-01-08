import Empresa from "../model/Empresa.js";

const validateEmpresa = async (req, res, next) => {
    try {
        const empresa = await Empresa.findById(req.params.idEmpresa);
        if (!empresa) {
            const empresa2 = await Empresa.findById(req.user.idEmpresa);
        }
        next();

    } catch (error) {
        return res.status(400).json({ mensagem: "Empresa não encontrada", error: error.message });
    }
}
export default validateEmpresa;