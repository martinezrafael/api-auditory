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
  // json middleware
  app.use(express.json());

  // user
  app.use(userRoutes);

  //company
  app.use(companyRoutes);

  // bank
  app.use(bankRoutes);
  app.use(bankAccountRoutes);
  app.use(bankTransactionRoutes);

  // settlements
  app.use(settlementRoutes);

  //credit
  app.use(creditRequestRoutes);
  app.use(creditOfferRoutes);

  // card acquirer
  app.use(cardAcquirerRoutes);

  // cardtransactions
  app.use(cardTransactionRoutes);

  // contract fee
  app.use(contractFeeRoutes);

  // audit
  app.use(auditRoutes);

  // document
  app.use(documentRoutes);
};

export default routes;
