import Chamado from "../model/Chamado.js";
import Empresa from "../model/Empresa.js";
import Funcionario from "../model/Funcionario.js";
import Suporte from "../model/Suporte.js";
import createLog from "../middleware/logs/createLog.js";
import yupChamado from "../middleware/yup/yupChamado.js";
import yup from 'yup';

async function index(req, res) {
    try {
        if (req.user.role === 'admin') {
            const empresa = await Empresa.findById(req.params.idEmpresa);
            if (empresa.idAdmin !== req.user.id) return res.status(400).json({ mensagem: "Acesso negado, esta empresa não pertence a você" });
            const chamado = await Chamado.find({ idEmpresa: req.params.idEmpresa });
            res.status(200).json({ mensagem: "Listar Chamados", chamado: chamado });
        }
        console.log('Funcionario dados', req.user, 'id empresa', req.params.idEmpresa);
        if (req.user.id === req.params.idEmpresa) {
            const chamado = await Chamado.find({ idEmpresa: req.user.idEmpresa });
            res.status(200).json({ mensagem: "Listar Chamados", chamado: chamado });
        } else {
            console.log('Caminho Erro');
            return res.status(400).json({ mensagem: "Acesso negado" });
        }

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}
async function show(req, res) {
    try {
        const chamado = await Chamado.findById(req.user.id);
        res.status(200).json({ mensagem: "Dados do Chamado", chamado: chamado });
    }
    catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}
async function store(req, res) {
    try {
        await yupChamado.yupStore.validate(req.body);

        const chamado = await Chamado.create({ ...req.body, idEmpresa: req.user.idEmpresa, idFuncionario: req.user.id });
        await createLog({
            action: `Chamado '${chamado.titulo}' cadastrado por '${req.user.nome}'`,
            idFuncionario: req.user.id,
            idChamado: chamado._id,
            idEmpresa: chamado.idEmpresa,
        });
        res.status(201).json({ mensagem: "Chamado cadastrado com sucesso!", chamado: chamado });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        await yupChamado.yupUpdate.validate(req.body);
        const chamadoAntigo = await Chamado.findById(req.params.idChamado);
        if (req.user.idEmpresa !== chamadoAntigo.idEmpresa.toString()) return res.status(400).json({ mensagem: "Este chamado pertence a outra empresa" });
        const chamado = await Chamado.findByIdAndUpdate(req.params.idChamado, req.body, { new: true, runValidators: true });

        await createLog({
            action: `Chamado '${chamado.titulo}' teve seu status atualizado por '${req.user.nome}'`,
            idFuncionario: chamadoAntigo.idFuncionario,
            idChamado: chamado._id,
            idEmpresa: chamado.idEmpresa,
        });
        res.status(200).json({ mensagem: "Chamado atualizado com sucesso!", chamadoAtualizado: chamado });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        res.status(400).json({ mensagem: "Erro ao atualizar", error: error.message });
    }

}
async function destroy(req, res) {
    try {
        const chamado = await Chamado.findById(req.params.idChamado);
        if (chamado.status !== "aberto") return res.status(400).json({ mensagem: "Apenas chamados pendentes podem ser deletados" });
        if (chamado.idFuncionario.toString() !== req.user.id.toString()) return res.status(400).json({ mensagem: "Apenas o funcionario que cadastrou o chamado pode deletar o mesmo" });
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