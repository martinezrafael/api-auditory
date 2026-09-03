import express from "express";
import BankController from "../controllers/bankController.js";

const routes = express.Router();

routes.post("/banks", BankController.create);
routes.get("/banks", BankController.getAll);
routes.get("/banks/:id", BankController.getById);
routes.put("/banks/:id", BankController.update);
routes.delete("/banks/:id", BankController.delete);

export default routes;
