
import { Router } from "express";
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
import validateEmpresa from "./middleware/validateEmpresa.js";
import validateChamadoStatus from "./middleware/chamado/validateChamadoStatus.js";
import validateChamado from "./middleware/chamado/validateChamado.js";

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
routerFuncionario.get("/:idEmpresa/funcionario/all", authenticateTokenAdmin, validateEmpresa, funcionarioController.index)
routerFuncionario.get("/:idEmpresa/funcionario", authenticateToken, validateEmpresa, funcionarioController.show)
routerFuncionario.post("/:idEmpresa/funcionario/cadastro", authenticateTokenAdmin, validateEmpresa, funcionarioController.store)
routerFuncionario.put("/:idEmpresa/funcionario", authenticateToken, validateEmpresa, funcionarioController.update)
routerFuncionario.delete("/:idEmpresa/funcionario", authenticateToken, validateEmpresa, funcionarioController.destroy)

//Suporte
routerSuporte.get("/:idEmpresa/suporte/all", authenticateTokenAdmin, validateEmpresa, suporteController.index)
routerSuporte.get("/:idEmpresa/suporte", authenticateToken, validateEmpresa, suporteController.show)
routerSuporte.post("/:idEmpresa/suporte/cadastro", authenticateTokenAdmin, validateEmpresa, suporteController.store)
routerSuporte.put("/:idEmpresa/suporte", authenticateToken, validateEmpresa, suporteController.update)
routerSuporte.delete("/:idEmpresa/suporte", authenticateToken, validateEmpresa, suporteController.destroy)

//Chamado
routerChamado.get("/:idEmpresa/chamado/all", authenticateToken, validateEmpresa, chamadoController.index)
routerChamado.get("/:idEmpresa/chamado/:idChamado", authenticateToken, validateEmpresa, chamadoController.show)
routerChamado.post("/:idEmpresa/chamado/cadastro", authenticateToken, validateEmpresa, chamadoController.store)
routerChamado.put("/:idEmpresa/chamado/:idChamado", authenticateTokenSuporte, validateEmpresa, validateChamado, validateChamadoStatus, chamadoController.update)
routerChamado.delete("/:idEmpresa/chamado/:idChamado", authenticateToken, validateEmpresa, chamadoController.destroy)

//Log
routerLog.get("/:idEmpresa/log/all", authenticateToken, logController.index)
routerLog.get("/:idEmpresa/log/:idChamado", authenticateToken, logController.show)

export { routerAdmin, routerLogin, routerEmpresa, routerFuncionario, routerSuporte, routerChamado, routerLog };