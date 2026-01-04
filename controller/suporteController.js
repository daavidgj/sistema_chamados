import Suporte from "../model/Suporte.js";
import Empresa from "../model/Empresa.js";

async function index(req, res) {
    const empresa = await Empresa.find({ _id: req.params.idEmpresa });
    const suportes = await Suporte.find({ idEmpresa: req.params.idEmpresa });
    const response = { Informações: { empresa: empresa, suportes: suportes } };
    res.status(200).json({ mensagem: "Listar Suportes", response });
}
async function show(req, res) {
    const suporte = await Suporte.findById(req.user.id).populate('idEmpresa');
    res.status(200).json({ mensagem: "Dados do Suporte", suporte: suporte });

}
async function store(req, res) {
    const suporte = await Suporte.create({ ...req.body, idEmpresa: req.params.idEmpresa })
    res.status(201).json({ mensagem: "Suporte cadastrado com sucesso!", suporte: suporte })
}
async function update(req, res) {
    try {
        const suporteAtualizado = await Suporte.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ mensagem: "Suporte atualizado com sucesso!", suporteAtualizado: suporteAtualizado });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar", error: error.message });
    }
}
async function destroy(req, res) {
    try {
        const suporte = await Suporte.findByIdAndDelete(req.user.id);
        res.status(200).json({ mensagem: "Suporte deletado com sucesso!", suporte: suporte });
    }
    catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar", error: error.message });
    }
}
export default { index, show, store, update, destroy };