import express from "express";
import BankAccountController from "../controllers/bankAccountController.js";

const routes = express.Router();

routes.post("/bank-accounts", BankAccountController.createBankAccount);
routes.get("/bank-accounts", BankAccountController.getAllBankAccounts);
routes.get("/bank-accounts/:id", BankAccountController.getBankAccountById);
routes.put("/bank-accounts/:id", BankAccountController.updateBankAccount);
routes.delete("/bank-accounts/:id", BankAccountController.deleteBankAccount);

export default routes;
