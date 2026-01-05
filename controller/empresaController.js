import Empresa from "../model/Empresa.js";
import Admin from "../model/Admin.js";

import yup from "yup";
import yupEmpresa from "../middleware/yup/yupEmpresa.js";

async function index(req, res) {
    const empresas = await Empresa.find({ idAdmin: req.user.id });
    res.status(200).json({ mensagem: "Listar Empresas", empresas: empresas });
}

async function show(req, res) {
    const empresa = await Empresa.findById(req.params.idEmpresa);
    res.status(200).json({ mensagem: "Dados da Empresa", empresa: empresa });
}
async function store(req, res) {
    await yupEmpresa.validate(req.body);
    try {

        const empresa = await Empresa.create({ ...req.body, idAdmin: req.user.id });
        res.status(201).json({ mensagem: "Empresa cadastrada com sucesso!", empresa: empresa });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        return res.status(400).json({ mensagem: error.message });
    }
}
async function update(req, res) {
    try {
        await yupEmpresa.validate(req.body);
        const empresa = await Empresa.findById(req.params.idEmpresa);
        if (req.body.nome === empresa.nome) return res.status(400).json({ mensagem: "Este nome já está sendo utilizado na empresa" });
        const empresaAtualizada = await Empresa.findByIdAndUpdate(req.params.idEmpresa, req.body, { new: true });
        res.status(200).json({ mensagem: "Empresa atualizada com sucesso!", empresaAtualizada: empresaAtualizada });

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}
async function destroy(req, res) {
    const empresa = await Empresa.findByIdAndDelete(req.params.idEmpresa);
    res.status(200).json({ mensagem: "Empresa deletada com sucesso!", empresa: empresa });
}
export default { index, show, store, update, destroy };