import Funcionario from "../model/Funcionario.js";

async function index(req, res) { }

async function show(req, res) { }
async function store(req, res) {
    console.log('Dados', req.body);
    try {
        const funcionario = await Funcionario.create({ ...req.body, idEmpresa: req.params.idEmpresa });
        res.status(201).json({ mensagem: "Funcionario cadastrado com sucesso!", funcionario: funcionario });

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ mensagem: "Funcionario atualizado com sucesso!", funcionarioAtualizado: funcionarioAtualizado });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar", error: error.message });
    }
}
async function destroy(req, res) {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.user.id);
        res.status(200).json({ mensagem: "Funcionario deletado com sucesso!", funcionario: funcionario });
    }
    catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar", error: error.message });
    }
}
export default { index, show, store, update, destroy };