import express from "express";
import CardTransactionController from "../controllers/cardTransactionController.js";

const routes = express.Router();

routes.post("/card-transactions", CardTransactionController.create);
routes.get("/card-transactions", CardTransactionController.getAll);
routes.get("/card-transactions/:id", CardTransactionController.getById);
routes.put("/card-transactions/:id", CardTransactionController.update);
routes.delete("/card-transactions/:id", CardTransactionController.delete);

export default routes;
