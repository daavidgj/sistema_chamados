import Admin from "../model/Admin.js";
import Funcionario from "../model/Funcionario.js";
import Suporte from "../model/Suporte.js";
import Empresa from "../model/Empresa.js";

const isAuthor = async (req, res, next) => {
    try {
        const funcionario = await Funcionario.findById(req.user.id);
        const suporte = await Suporte.findById(req.user.id);
        const admin = await Admin.findById(req.user.id);

        const userLogado = admin || funcionario || suporte;
        if (!userLogado) return res.status(401).json({ message: 'Não autorizado' });
        if (admin) {
            try {
                const empresa = await Empresa.findById(req.params.idEmpresa);
                if (empresa.idAdmin.toString() !== admin._id.toString()) {
                    return res.status(401).json({ message: 'Esta empresa pertence a outro usuário' });
                }

            } catch (error) {
                return res.status(401).json({ message: 'Não autorizado', error: error.message });
            }
        }
        next();

    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao validar autorização", error: error.message });
    }
}

export default isAuthor;