import express from "express";
import companyController from "../controllers/companyController.js";

const routes = express.Router();

routes.post("/companies", companyController.create);
routes.get("/companies", companyController.getAll);
routes.get("/companies/:id", companyController.getById);
routes.put("/companies/:id", companyController.update);
routes.delete("/companies/:id", companyController.delete);

export default routes;
