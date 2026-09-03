import express from "express";
import CardAcquirerController from "../controllers/CardAcquirerController.js";

const routes = express.Router();

routes.post("/card-acquirers", CardAcquirerController.create);
routes.get("/card-acquirers", CardAcquirerController.getAll);
routes.get("/card-acquirers/:id", CardAcquirerController.getById);
routes.put("/card-acquirers/:id", CardAcquirerController.update);
routes.delete("/card-acquirers/:id", CardAcquirerController.delete);

export default routes;
