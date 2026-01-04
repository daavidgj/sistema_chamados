import Chamado from "../../model/Chamado.js";

const validateChamadoStatus = async (req, res, next) => {
    if (!req.params.idChamado) return next();
    const statusValidos = ["aberto", "em_andamento", "aguardando", "concluido"];
    const chamadoVelho = await Chamado.findById(req.params.idChamado);
    const chamado = req.body;
    if (!statusValidos.includes(chamado.status)) return res.status(400).json({ mensagem: "Status Inválido" });
    if (chamadoVelho.status === chamado.status) return res.status(400).json({ mensagem: "Status já possui esses valores" });
    next();
}

export default validateChamadoStatus;