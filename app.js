import express from "express";
import connectDB from "./db.js";

const SECRET_KEY = process.env.JWT_SECRET;

import 'dotenv/config';

import { routerAdmin, routerLogin, routerEmpresa, routerFuncionario } from "./routes.js";

const app = express();
const port = 3000;
const users = [
    { id: 1, username: 'admilton', password: '123456', role: 'admin' },
    { id: 2, username: 'useilton', password: '123456', role: 'user' },
]
app.use(express.json());
await connectDB();

app.use('/admin', routerAdmin);
app.use('/login', routerLogin);
app.use('/empresa', routerEmpresa);
app.use('/empresa', routerFuncionario);
/*app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });

    }
    else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
})*/
/*
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, SECRET_KEY, (error, u) => {
            error && res.status(401).json({ message: 'Token inválido' });
            req.user = u;
            next();

        })
    } else {
        res.status(401).json({ message: 'Token inválido' });
    }
}
app.get('/account', authenticateToken, (req, res) => {
    console.log('Usuário Permitido em account', req.user);
    res.status(200).json(req.user);
})
app.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role === 'admin') {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ message: 'Usuário não tem permissão para acessar está página' });
    }
})*/

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})