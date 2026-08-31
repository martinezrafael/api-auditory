import express from "express";
import companyRoutes from "./companyRoutes.js";
import userRoutes from "./userRoutes.js";
import bankRoutes from "./bankRoutes.js";

const routes = (app) => {
  app.use(express.json(), companyRoutes, userRoutes, bankRoutes);
};

export default routes;
