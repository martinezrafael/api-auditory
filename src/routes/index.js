import express from "express";
import companyRoutes from "./companyRoutes.js";
import userRoutes from "./userRoutes.js";
import bankRoutes from "./bankRoutes.js";
import auditRoutes from "./auditRoutes.js";
import documentRoutes from "./documentRoutes.js";
import bankAccountRoutes from "./bankAccountRoutes.js";
import bankTransactionRoutes from "./bankTransactionRoutes.js";
import cardAcquirerRoutes from "./cardAcquirerRoutes.js";
import cardTransactionRoutes from "./cardTransactionRoutes.js";
import settlementRoutes from "./settlementRoutes.js";
import creditRequestRoutes from "./creditRequestRoutes.js";
import creditOfferRoutes from "./creditOfferRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    companyRoutes,
    userRoutes,
    bankRoutes,
    auditRoutes,
    documentRoutes,
    bankAccountRoutes,
    bankTransactionRoutes,
    cardAcquirerRoutes,
    creditOfferRoutes,
    cardTransactionRoutes,
    settlementRoutes,
    creditRequestRoutes,
  );
};

export default routes;
