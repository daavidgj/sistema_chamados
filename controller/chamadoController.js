import Chamado from "../model/Chamado.js";
import Empresa from "../model/Empresa.js";
import Funcionario from "../model/Funcionario.js";
import Suporte from "../model/Suporte.js";
import createLog from "../middleware/logs/createLog.js";

async function index(req, res) {
    try {
        const chamado = await Chamado.find({ idEmpresa: req.params.idEmpresa });
        res.status(200).json({ mensagem: "Listar Chamados", chamado: chamado });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}
async function show(req, res) {
    try {
        const chamado = await Chamado.findById(req.params.id);
        res.status(200).json({ mensagem: "Dados do Chamado", chamado: chamado });
    }
    catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}
async function store(req, res) {
    try {
        const chamado = await Chamado.create({ ...req.body, idEmpresa: req.params.idEmpresa, idFuncionario: req.user.id });
        await createLog({
            action: `Chamado '${chamado.titulo}' cadastrado por '${req.user.nome}'`,
            idFuncionario: req.user.id,
            idChamado: chamado._id,
            idEmpresa: chamado.idEmpresa,
        });
        res.status(201).json({ mensagem: "Chamado cadastrado com sucesso!", chamado: chamado });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        const chamadoAntigo = await Chamado.findById(req.params.idChamado);
        const chamado = await Chamado.findByIdAndUpdate(req.params.idChamado, req.body, { new: true, runValidators: true });
        console.log('User ativo', req.user);
        console.log('chamado antigo', chamadoAntigo.idFuncionario);

        await createLog({
            action: `Chamado '${chamado.titulo}' teve seu status atualizado por '${req.user.nome}'`,
            idFuncionario: chamadoAntigo.idFuncionario,
            idChamado: chamado._id,
            idEmpresa: chamado.idEmpresa,
        });
        res.status(200).json({ mensagem: "Chamado atualizado com sucesso!", chamadoAtualizado: chamado });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar", error: error.message });
    }

}
async function destroy(req, res) {
    try {
        const chamado = await Chamado.findById(req.params.idChamado);
        if (chamado.status !== "aberto") return res.status(400).json({ mensagem: "Apenas chamados pendentes podem ser deletados" });
        const funcionario = await Funcionario.findById(chamado.idFuncionario);
        if (funcionario._id != req.user.id) return res.status(400).json({ mensagem: "Apenas o funcionario que cadastrou o chamado pode deletar o mesmo" });
        const chamadoDeletar = await Chamado.findByIdAndDelete(req.params.idChamado);
        await createLog({
            action: `Chamado '${chamado.titulo}' deletado por '${req.user.nome}' enquanto estava com status 'aberto'`,
            idFuncionario: req.user.id,
            idChamado: chamado._id,
            idEmpresa: chamado.idEmpresa,
        });
        res.status(200).json({ mensagem: "Chamado deletado com sucesso!", chamadoDeletar });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar", error: error.message });
    }
}
export default { index, show, store, update, destroy };