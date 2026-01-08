import Admin from "../model/Admin.js";
import Empresa from "../model/Empresa.js";
import yupAdmin from "../middleware/yup/yupAdmin.js";

import yup from "yup";

async function index(req, res) {
    const admins = await Admin.find();
    return res.status(200).json({ mensagem: "Listar Administradores", admins: admins });
}

async function show(req, res) {
    try {
        const admin = await Admin.findById(req.user.id);
        const empresa = await Empresa.find({ idAdmin: req.user.id });
        const response = { admin: admin, empresas: empresa };
        return res.status(200).json({ mensagem: "Dados do Administrador", Informações: response });

    } catch (error) {
        return res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }


}
async function store(req, res) {
    try {
        await yupAdmin.yupStore.validate(req.body);
        const novoAdmin = await Admin.create({ ...req.body })
        console.log(novoAdmin);
        return res.status(200).json({ mensagem: "Administrador cadastrado com sucesso!", novoAdmin: novoAdmin });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        return res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        await yupAdmin.yupUpdate.validate(req.body);
        const adminAtualizado = await Admin.findByIdAndUpdate(req.user.id, req.body, { new: true });
        return res.status(200).json({ mensagem: "Administrador atualizado com sucesso!", adminAtualizado: adminAtualizado });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        return res.status(400).json({ mensagem: "Erro ao atualizar", error: error.message });
    }


}
async function destroy(req, res) {
    try {
        const adminDados = await Admin.findById(req.user.id);
        const adminDeletado = await Admin.findByIdAndDelete(req.user.id);
        return res.status(200).json({ mensagem: "Administrador deletado com sucesso!", adminDeletado: adminDados });
    }
    catch (error) {
        return res.status(400).json({ mensagem: "Erro ao deletar", error: error.message });
    }
}
export default { index, show, store, update, destroy };