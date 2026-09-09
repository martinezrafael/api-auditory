import express from "express";
import UserController from "../controllers/UserController.js";
import identifyUser from "../middlewares/identifyUser.js";
import authorizeMiddleware from "../middlewares/authorizeMiddleware.js";

const routes = express.Router();

// ROTA PADRÃO DE CADASTRO PÚBLICO — sem autenticação, continua aberta
routes.post("/users", UserController.create);

// ROTA PARA CRIAÇÃO DE USUÁRIO REALIZADA POR UM ADMINISTRADOR
routes.post(
  "/users/admin",
  identifyUser,
  authorizeMiddleware("MANAGE_USERS"),
  UserController.adminCreate,
);

// Demais rotas de consulta, alteração e exclusão — gerenciamento administrativo
routes.get(
  "/users",
  identifyUser,
  authorizeMiddleware("MANAGE_USERS"),
  UserController.getAll,
);

routes.get(
  "/users/:id",
  identifyUser,
  authorizeMiddleware("MANAGE_USERS"),
  UserController.getById,
);

routes.put(
  "/users/:id",
  identifyUser,
  authorizeMiddleware("MANAGE_USERS"),
  UserController.update,
);

routes.delete(
  "/users/:id",
  identifyUser,
  authorizeMiddleware("MANAGE_USERS"),
  UserController.delete,
);

export default routes;
