import express from "express";
import userRoutes from "./userRoutes.js";
import companyRoutes from "./companyRoutes.js";
import bankRoutes from "./bankRoutes.js";
import bankAccountRoutes from "./bankAccountRoutes.js";
import bankTransactionRoutes from "./bankTransactionRoutes.js";
import settlementRoutes from "./settlementRoutes.js";
import creditRequestRoutes from "./creditRequestRoutes.js";
import creditOfferRoutes from "./creditOfferRoutes.js";
import cardAcquirerRoutes from "./cardAcquirerRoutes.js";
import cardTransactionRoutes from "./cardTransactionRoutes.js";
import contractFeeRoutes from "./contractFeeRoutes.js";
import auditRoutes from "./auditRoutes.js";
import documentRoutes from "./documentRoutes.js";

const routes = (app) => {
  app.use(express.json());

  app.use(userRoutes);
  app.use(companyRoutes);
  app.use(bankRoutes);
  app.use(bankAccountRoutes);
  app.use(bankTransactionRoutes);
  app.use(settlementRoutes);
  app.use(creditRequestRoutes);
  app.use(creditOfferRoutes);
  app.use(cardAcquirerRoutes);
  app.use(cardTransactionRoutes);
  app.use(contractFeeRoutes);
  app.use(auditRoutes);
  app.use(documentRoutes);
};

export default routes;
