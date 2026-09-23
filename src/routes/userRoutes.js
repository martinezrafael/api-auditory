import express from "express";
import UserController from "../controllers/UserController.js";

const routes = express.Router();

// create a user
routes.post("/users", UserController.create);

// get all users
routes.get("/users", UserController.getAll);

// get user by id
routes.get("/users/:id", UserController.getById);

// update a user
routes.put("/users/:id", UserController.update);

// delete a user
routes.delete("/users/:id", UserController.delete);

export default routes;
