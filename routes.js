import { Router } from "express";
import adminController from "./controller/adminController.js";
import loginController from "./controller/loginController.js";
import empresaController from "./controller/empresaController.js";
import funcionarioController from "./controller/funcionarioController.js";

//Import Middleware
import authenticateToken from "./middleware/authentication.js";
import authenticateTokenAdmin from "./middleware/authenticationAdmin.js";
import validadeEmpresa from "./middleware/validadeEmpresa.js";

import validateFuncionario from "./middleware/validateFuncionario.js";




const routerAdmin = Router();
const routerLogin = Router();
const routerEmpresa = Router();
const routerFuncionario = Router();
const routerSuporte = Router();
const routerChamado = Router();



routerLogin.post("/", loginController.store)
//Admin
routerAdmin.get("/", authenticateToken, adminController.index)
routerAdmin.get("/perfil", authenticateToken, adminController.show)
routerAdmin.post("/cadastro", adminController.store)
routerAdmin.put("/perfil/editar", authenticateToken, adminController.update)
routerAdmin.delete("/perfil/deletar", authenticateToken, adminController.destroy)

//Empresa
routerEmpresa.get("/", authenticateToken, empresaController.index)
routerEmpresa.get("/dados/:id", authenticateToken, empresaController.show)
routerEmpresa.post("/cadastro", authenticateToken, empresaController.store)
routerEmpresa.put("/editar/:id", authenticateToken, empresaController.update)
routerEmpresa.delete("/deletar/:id", authenticateToken, empresaController.destroy)

//Functionario
routerFuncionario.get("/", authenticateToken, funcionarioController.index)
routerFuncionario.get("/:idEmpresa/funcionario", authenticateToken, funcionarioController.show)
routerFuncionario.post("/:idEmpresa/funcionario/cadastro", authenticateTokenAdmin, validadeEmpresa, funcionarioController.store)
routerFuncionario.put("/:idEmpresa/funcionario", authenticateToken, funcionarioController.update)
routerFuncionario.delete("/:idEmpresa/funcionario", authenticateToken, funcionarioController.destroy)


export { routerAdmin, routerLogin, routerEmpresa, routerFuncionario };