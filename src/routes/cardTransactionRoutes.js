import express from "express";
import CardTransactionController from "../controllers/cardTransactionController.js";

const routes = express.Router();

routes.post(
  "/card-transactions",
  CardTransactionController.createCardTransaction,
);
routes.get(
  "/card-transactions",
  CardTransactionController.getAllCardTransactions,
);
routes.get(
  "/card-transactions/:id",
  CardTransactionController.getCardTransactionById,
);
routes.put(
  "/card-transactions/:id",
  CardTransactionController.updateCardTransaction,
);
routes.delete(
  "/card-transactions/:id",
  CardTransactionController.deleteCardTransaction,
);

export default routes;
