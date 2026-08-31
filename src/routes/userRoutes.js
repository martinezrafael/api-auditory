import express from "express";
import userController from "../controllers/userController.js";

const routes = express.Router();

routes.post("/users", userController.createUser);
routes.get("/users", userController.getAllUsers);
routes.get("/users/:id", userController.getUserById);
routes.put("/users/:id", userController.updateUser);
routes.delete("/users/:id", userController.deleteUser);

export default routes;
