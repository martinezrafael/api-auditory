import express from "express";
import companyController from "../controllers/companyController.js";

const routes = express.Router();

routes.post("/companies", companyController.createCompany);
routes.get("/companies", companyController.getAllCompanies);
routes.get("/companies/:id", companyController.getCompanyById);
routes.put("/companies/:id", companyController.updateCompany);
routes.delete("/companies/:id", companyController.deleteCompany);

export default routes;
