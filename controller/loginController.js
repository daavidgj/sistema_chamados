import Admin from "../model/Admin.js";
import Funcionario from "../model/Funcionario.js";
import Suporte from "../model/Suporte.js";
import yupLogin from "../middleware/yup/yupLogin.js";
import yup from 'yup';

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

async function store(req, res) {
    const { email, password } = req.body;
    try {
        await yupLogin.yupStore.validate(req.body);
        const adminDados = await Admin.findOne({ email, password });
        const funcionarioDados = await Funcionario.findOne({ email, password });
        const suporteDados = await Suporte.findOne({ email, password });
        const userDados = adminDados || funcionarioDados || suporteDados;

        if (!userDados) return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
        const token = jwt.sign({ id: userDados._id, email: userDados.email, role: userDados.role, nome: userDados.nome }, SECRET_KEY/*, { expiresIn: '1h' }*/);
        const roleAcess = userDados.role;
        return res.status(200).json({ mensagem: "Autenticado com sucesso como " + roleAcess, token: token });

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ mensagem: error.message });
        }
        return res.status(400).json({ mensagem: "Erro ao autenticar", error: error.message });
    }
}


export default { store };