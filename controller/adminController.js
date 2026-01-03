import Admin from "../model/Admin.js";

async function index(req, res) {
    const admins = await Admin.find();
    res.status(200).json({ mensagem: "Listar Administradores", admins: admins });
}

async function show(req, res) {
    console.log('dados req user', req.user);

    try {
        const admin = req.user;
        res.status(200).json({ mensagem: "Dados do Administrador", admin: admin });

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao buscar", error: error.message });
    }


}
async function store(req, res) {
    try {
        const novoAdmin = await Admin.create({ ...req.body })
        console.log(novoAdmin);
        res.status(200).json({ mensagem: "Administrador cadastrado com sucesso!", novoAdmin: novoAdmin });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao cadastrar", error: error.message });
    }
}
async function update(req, res) {
    try {
        const adminAtualizado = await Admin.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.status(200).json({ mensagem: "Administrador atualizado com sucesso!", adminAtualizado: adminAtualizado });
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar", error: error.message });
    }


}
async function destroy(req, res) {
    try {
        const adminDados = await Admin.findById(req.user.id);
        const adminDeletado = await Admin.findByIdAndDelete(req.user.id);
        res.status(200).json({ mensagem: "Administrador deletado com sucesso!", adminDeletado: adminDados });
    }
    catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar", error: error.message });
    }
}
export default { index, show, store, update, destroy };