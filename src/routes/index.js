import express from "express";
import companyRoutes from "./companyRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = (app) => {
  app.use(express.json(), companyRoutes, userRoutes);
};

export default routes;
