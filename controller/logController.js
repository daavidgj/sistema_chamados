import Log from "../model/Log.js";

async function index(req, res) {
    try {
        const logs = await Log.find({ idEmpresa: req.params.idEmpresa }).sort({ createdAt: -1 });
        res.status(200).json({ mensagem: "Listar Logs", logs: logs });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}

async function show(req, res) {
    try {
        const log = await Log.find({ idEmpresa: req.params.idEmpresa, idChamado: req.params.idChamado }).sort({ createdAt: -1 });
        res.status(200).json({ mensagem: "Dados do Log", log: log });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}

export default { index, show };