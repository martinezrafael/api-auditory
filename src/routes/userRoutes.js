import express from "express";
import UserController from "../controllers/UserController.js";

const routes = express.Router();

// ROTA PADRÃO DE CADASTRO PÚBLICO
routes.post("/users", UserController.create);

// ROTA PARA CRIAÇÃO DE USUÁRIO REALIZADA POR UM ADMINISTTRADOR
routes.post("/users/admin", UserController.adminCreate);

// Demais rotas de consulta, alteração e exclusão
routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserController.getById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

export default routes;
