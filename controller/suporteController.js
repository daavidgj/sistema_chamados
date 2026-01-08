import Suporte from "../model/Suporte.js";
import Empresa from "../model/Empresa.js";
import yupSuporte from "../middleware/yup/yupSuporte.js";
import yup from "yup";

async function index(req, res) {
    const empresa = await Empresa.find({ _id: req.params.idEmpresa });
    const suportes = await Suporte.find({ idEmpresa: req.params.idEmpresa });
    const response = { empresa: empresa, suportes: suportes };
    res.status(200).json({ mensagem: "Listar Suportes", Informações: response });
}
async function show(req, res) {
    try {

        const suporte = await Suporte.findById(req.user.id).populate('idEmpresa');
        res.status(200).json({ mensagem: "Dados do Suporte", suporte: suporte });

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }

}
async function store(req, res) {
    try {
        await yupSuporte.yupStore.validate(req.body);
        const suporte = await Suporte.create({ ...req.body, idEmpresa: req.params.idEmpresa })
        res.status(201).json({ mensagem: "Suporte cadastrado com sucesso!", suporte: suporte })

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        return res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        await yupSuporte.yupUpdate.validate(req.body);
        const suporteAtualizado = await Suporte.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ mensagem: "Suporte atualizado com sucesso!", suporteAtualizado: suporteAtualizado });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
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