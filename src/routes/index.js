import express from "express";
import companyRoutes from "./companyRoutes.js";
import userRoutes from "./userRoutes.js";
import bankRoutes from "./bankRoutes.js";
import auditRoutes from "./auditRoutes.js";
import documentRoutes from "./documentRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    companyRoutes,
    userRoutes,
    bankRoutes,
    auditRoutes,
    documentRoutes,
  );
};

export default routes;
