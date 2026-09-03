import express from "express";
import BankAccountController from "../controllers/bankAccountController.js";

const routes = express.Router();

routes.post("/bank-accounts", BankAccountController.create);
routes.get("/bank-accounts", BankAccountController.getAll);
routes.get("/bank-accounts/:id", BankAccountController.getById);
routes.put("/bank-accounts/:id", BankAccountController.update);
routes.delete("/bank-accounts/:id", BankAccountController.delete);

export default routes;
