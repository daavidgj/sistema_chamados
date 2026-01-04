import Chamado from "../../model/Chamado.js";

const validateChamado = async (req, res, next) => {
    try {
        const chamado = await Chamado.findById(req.params.idChamado);
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: "Chamado não encontrado", error: error.message });
    }
}
export default validateChamado;