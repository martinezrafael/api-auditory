import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.post("/users", UserController.create);
routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserController.getById);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

export default routes;
