import express from "express";
import BankTransactionController from "../controllers/bankTransactionController.js";

const routes = express.Router();

routes.post(
  "/bank-transactions",
  BankTransactionController.createBankTransaction,
);
routes.get(
  "/bank-transactions",
  BankTransactionController.getAllBankTransactions,
);
routes.get(
  "/bank-transactions/:id",
  BankTransactionController.getBankTransactionById,
);
routes.put(
  "/bank-transactions/:id",
  BankTransactionController.updateBankTransaction,
);
routes.delete(
  "/bank-transactions/:id",
  BankTransactionController.deleteBankTransaction,
);

export default routes;
