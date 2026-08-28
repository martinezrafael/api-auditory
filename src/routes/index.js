import express from "express";
import companyRoutes from "./companyRoutes.js";

const routes = (app) => {
  app.use(express.json(), companyRoutes);
};

export default routes;
