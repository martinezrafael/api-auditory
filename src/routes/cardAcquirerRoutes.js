import express from "express";
import CardAcquirerController from "../controllers/cardAcquirerController.js";

const routes = express.Router();

routes.post("/card-acquirers", CardAcquirerController.createCardAcquirer);
routes.get("/card-acquirers", CardAcquirerController.getAllCardAcquirers);
routes.get("/card-acquirers/:id", CardAcquirerController.getCardAcquirerById);
routes.put("/card-acquirers/:id", CardAcquirerController.updateCardAcquirer);
routes.delete("/card-acquirers/:id", CardAcquirerController.deleteCardAcquirer);

export default routes;
