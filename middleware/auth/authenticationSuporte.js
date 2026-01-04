import jwt from "jsonwebtoken";
import Admin from "../../model/Admin.js";
import Suporte from "../../model/Suporte.js";
const SECRET_KEY = process.env.JWT_SECRET;
const authenticateTokenSuporte = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {

            jwt.verify(token, SECRET_KEY, (error, u) => {
                if (error) return res.status(401).json({ message: 'Token inválido', error: error.message });
                req.user = u;
            })
            const admin = await Admin.findById(req.user.id);
            const suporte = await Suporte.findById(req.user.id);

            const userLogado = admin || suporte;
            if (!userLogado) return res.status(401).json({ message: 'Token inválido' });
            next();

        } catch (error) {
            res.status(401).json({ message: 'Token inválido', error: error.message });
        }
    } else {
        res.status(401).json({ message: 'Token inválido' });
    }
}

export default authenticateTokenSuporte;