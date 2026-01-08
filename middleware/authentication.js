import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import Funcionario from "../model/Funcionario.js";
import Suporte from "../model/Suporte.js";
const SECRET_KEY = process.env.JWT_SECRET;
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {

            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;

            const admin = await Admin.findById(req.user.id);
            const funcionario = await Funcionario.findById(req.user.id);
            const suporte = await Suporte.findById(req.user.id);

            const userLogado = admin || funcionario || suporte;
            if (!userLogado) return res.status(401).json({ message: 'Token inválido' });
            next();

        } catch (error) {
            res.status(401).json({ message: 'Token inválido', error: error.message });
        }
    } else {
        return res.status(401).json({ message: 'Token inválido, não foi encontrado no header' });
    }
}

export default authenticateToken;