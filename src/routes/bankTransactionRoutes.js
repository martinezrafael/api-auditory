import express from "express";
import BankTransactionController from "../controllers/BankTransactionController.js";

const routes = express.Router();

routes.post("/bank-transactions", BankTransactionController.create);
routes.get("/bank-transactions", BankTransactionController.getAll);
routes.get("/bank-transactions/:id", BankTransactionController.getById);
routes.put("/bank-transactions/:id", BankTransactionController.update);
routes.delete("/bank-transactions/:id", BankTransactionController.delete);

export default routes;
