import express from "express";
import CompanyController from "../controllers/companyController.js";

const routes = express.Router();

routes.post("/companies", CompanyController.createCompany);
routes.get("/companies", CompanyController.getAllCompanies);
routes.get("/companies/:id", CompanyController.getCompanyById);
routes.put("/companies/:id", CompanyController.updateCompany);
routes.delete("/companies/:id", CompanyController.deleteCompany);

export default routes;
