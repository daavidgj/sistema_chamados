import express from "express";
import connectDB from "./db.js";

const SECRET_KEY = process.env.JWT_SECRET;

import 'dotenv/config';

import { routerAdmin, routerLogin, routerEmpresa, routerFuncionario, routerSuporte, routerChamado, routerLog } from "./routes.js";

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
app.use('/empresa', routerSuporte);
app.use('/empresa', routerChamado);
app.use('/empresa', routerLog);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})