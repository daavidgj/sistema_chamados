import Chamado from "../../model/Chamado.js";

const validateChamadoStatus = async (req, res, next) => {
    try {

        if (!req.params.idChamado) return next();
        const statusValidos = ["aberto", "em_andamento", "aguardando", "concluido"];
        const chamado = req.body;
        if (!statusValidos.includes(chamado.status)) return res.status(400).json({ mensagem: "Status Inválido" });
        const chamadoVelho = await Chamado.findById(req.params.idChamado);
        if (chamadoVelho.status === chamado.status) return res.status(400).json({ mensagem: "Status já possui esses valores" });
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: "Erro ao validar status", error: error.message });
    }
}

export default validateChamadoStatus;