
import { Router } from "express";
import yup from "yup";
//Controller
import adminController from "./controller/adminController.js";
import loginController from "./controller/loginController.js";
import empresaController from "./controller/empresaController.js";
import funcionarioController from "./controller/funcionarioController.js";
import suporteController from "./controller/suporteController.js";
import chamadoController from "./controller/chamadoController.js";
import logController from "./controller/logController.js";

//Import Middleware
import authenticateToken from "./middleware/authentication.js";
import authenticateTokenAdmin from "./middleware/authenticationAdmin.js";
import authenticateTokenSuporte from "./middleware/auth/authenticationSuporte.js";
import authenticateTokenFuncionario from "./middleware/auth/authenticationFuncionario.js";
import validateEmpresa from "./middleware/validateEmpresa.js";
import validateChamadoStatus from "./middleware/chamado/validateChamadoStatus.js";
import validateChamado from "./middleware/chamado/validateChamado.js";
import isAuthor from "./middleware/isAuthor.js";

import validateFuncionario from "./middleware/validateFuncionario.js";




const routerAdmin = Router();
const routerLogin = Router();
const routerEmpresa = Router();
const routerFuncionario = Router();
const routerSuporte = Router();
const routerChamado = Router();
const routerLog = Router();



routerLogin.post("/", loginController.store)
//Admin
routerAdmin.get("/", authenticateToken, adminController.show)
routerAdmin.post("/cadastro", adminController.store)
routerAdmin.put("/editar", authenticateToken, adminController.update)
routerAdmin.delete("/deletar", authenticateToken, adminController.destroy)

//Empresa
routerEmpresa.get("/", authenticateToken, empresaController.index)
routerEmpresa.get("/detalhes/:idEmpresa", authenticateToken, isAuthor, empresaController.show)
routerEmpresa.post("/cadastro", authenticateToken, empresaController.store)
routerEmpresa.put("/editar/:idEmpresa", authenticateTokenAdmin, isAuthor, empresaController.update)
routerEmpresa.delete("/deletar/:idEmpresa", authenticateToken, isAuthor, empresaController.destroy)

//Funcionario
routerFuncionario.get("/:idEmpresa/funcionario/all", authenticateTokenAdmin, validateEmpresa, isAuthor, funcionarioController.index)//Admin
routerFuncionario.get("/funcionario", authenticateTokenFuncionario, funcionarioController.show)
routerFuncionario.post("/:idEmpresa/funcionario/cadastro", authenticateTokenAdmin, validateEmpresa, isAuthor, funcionarioController.store)
routerFuncionario.put("/funcionario", authenticateTokenFuncionario, validateEmpresa, validateFuncionario, funcionarioController.update)
routerFuncionario.delete("/funcionario", authenticateToken, validateEmpresa, funcionarioController.destroy)

//Suporte
routerSuporte.get("/:idEmpresa/suporte/all", authenticateTokenAdmin, validateEmpresa, isAuthor, suporteController.index)//Admin
routerSuporte.get("/suporte", authenticateTokenSuporte, validateEmpresa, suporteController.show)
routerSuporte.post("/:idEmpresa/suporte/cadastro", authenticateTokenAdmin, validateEmpresa, isAuthor, suporteController.store)
routerSuporte.put("/suporte", authenticateTokenSuporte, validateEmpresa, suporteController.update)
routerSuporte.delete("/suporte", authenticateTokenSuporte, validateEmpresa, suporteController.destroy)

//Chamado
routerChamado.get("/:idEmpresa/chamado/all", authenticateTokenSuporte, validateEmpresa, chamadoController.index)
routerChamado.get("/chamado/:idChamado", authenticateToken, validateEmpresa, chamadoController.show)
routerChamado.post("/chamado/cadastro", authenticateTokenFuncionario, validateEmpresa, chamadoController.store)
routerChamado.put("/chamado/:idChamado", authenticateTokenSuporte, validateEmpresa, validateChamado, validateChamadoStatus, chamadoController.update)
routerChamado.delete("/chamado/:idChamado", authenticateTokenFuncionario, validateEmpresa, chamadoController.destroy)
/* 

Ajeitar acesso nos chamados

*/
//Log
routerLog.get("/:idEmpresa/log/all", authenticateToken, logController.index)
routerLog.get("/:idEmpresa/log/:idChamado", authenticateToken, logController.show)

export { routerAdmin, routerLogin, routerEmpresa, routerFuncionario, routerSuporte, routerChamado, routerLog };