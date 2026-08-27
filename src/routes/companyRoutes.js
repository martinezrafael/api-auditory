import express from "express";
import companyController from "../controllers/companyController.js";

const routes = express.Router();

routes.get("/companies", companyController.createCompany);

export default routes;
