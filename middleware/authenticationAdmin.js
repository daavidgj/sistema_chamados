import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
const SECRET_KEY = process.env.JWT_SECRET;
const authenticateTokenAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {

            jwt.verify(token, SECRET_KEY, (error, u) => {
                if (error) return res.status(401).json({ message: 'Token inválido' });
                req.user = u;
            })
            const admin = await Admin.findById(req.user.id);
            if (!admin) return res.status(401).json({ message: 'Acesso não autorizado' });
            if (admin.role !== "admin") return res.status(401).json({ message: 'Não autorizado' });
            next();

        } catch (error) {
            res.status(401).json({ message: 'Token inválido', error: error.message });
        }
    } else {
        res.status(401).json({ message: 'Token inválido' });
    }
}

export default authenticateTokenAdmin;