import express from "express";
import companyRoutes from "./companyRoutes.js";
import userRoutes from "./userRoutes.js";
import bankRoutes from "./bankRoutes.js";
import auditRoutes from "./auditRoutes.js";
import documentRoutes from "./documentRoutes.js";
import bankAccountRoutes from "./bankAccountRoutes.js";
import bankTransactionRoutes from "./bankTransactionRoutes.js";

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
  );
};

export default routes;
