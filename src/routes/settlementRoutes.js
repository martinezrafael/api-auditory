import express from "express";
import SettlementController from "../controllers/settlementController.js";

const routes = express.Router();

routes.post("/settlements", SettlementController.create);
routes.get("/settlements", SettlementController.getAll);
routes.get("/settlements/:id", SettlementController.getById);
routes.put("/settlements/:id", SettlementController.update);
routes.delete("/settlements/:id", SettlementController.delete);

export default routes;
