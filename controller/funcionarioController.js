import Funcionario from "../model/Funcionario.js";
import Empresa from "../model/Empresa.js";
import yupFuncionario from "../middleware/yup/yupFuncionario.js";

async function index(req, res) {
    const empresa = await Empresa.find({ _id: req.params.idEmpresa });
    const funcionarios = await Funcionario.find({ idEmpresa: req.params.idEmpresa });
    const response = { empresa: empresa, funcionarios: funcionarios };
    res.status(200).json({ mensagem: "Listar Funcionarios", Informações: response });
}

async function show(req, res) {
    try {
        const funcionario = await Funcionario.findById(req.user.id).populate('idEmpresa');
        res.status(200).json({ mensagem: "Dados do Funcionario", funcionario: funcionario });

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }
}
async function store(req, res) {
    console.log('Dados', req.body);
    try {
        await yupFuncionario.yupStore.validate(req.body);
        const funcionario = await Funcionario.create({ ...req.body, idEmpresa: req.params.idEmpresa });
        res.status(201).json({ mensagem: "Funcionario cadastrado com sucesso!", funcionario: funcionario });

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        await yupFuncionario.yupUpdate.validate(req.body);
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