import Empresa from "../model/Empresa.js";

async function index(req, res) {
    const empresas = await Empresa.find({ idAdmin: req.user.id });
    res.status(200).json({ mensagem: "Listar Empresas", empresas: empresas });
}
async function show(req, res) {
    const empresa = await Empresa.findById(req.params.id);
    res.status(200).json({ mensagem: "Dados da Empresa", empresa: empresa });
}
async function store(req, res) {
    const empresa = await Empresa.create({ ...req.body, idAdmin: req.user.id });
    console.log(empresa);
    res.status(201).json({ mensagem: "Empresa cadastrada com sucesso!", empresa: empresa });
}
async function update(req, res) {
    const empresaAtualizada = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ mensagem: "Empresa atualizada com sucesso!", empresaAtualizada: empresaAtualizada });
}
async function destroy(req, res) {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensagem: "Empresa deletada com sucesso!", empresa: empresa });
}
export default { index, show, store, update, destroy };