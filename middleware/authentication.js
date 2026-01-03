import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import Funcionario from "../model/Funcionario.js";
const SECRET_KEY = process.env.JWT_SECRET;
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {

            jwt.verify(token, SECRET_KEY, (error, u) => {
                if (error) return res.status(401).json({ message: 'Token inválido', error: error.message });
                req.user = u;
            })
            const admin = await Admin.findById(req.user.id);
            const funcionario = await Funcionario.findById(req.user.id);
            const userLogado = admin || funcionario;
            if (!userLogado) return res.status(401).json({ message: 'Token inválido' });
            next();

        } catch (error) {
            res.status(401).json({ message: 'Token inválido', error: error.message });
        }
    } else {
        res.status(401).json({ message: 'Token inválido' });
    }
}

export default authenticateToken;