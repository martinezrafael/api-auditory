import express from "express";
import SettlementController from "../controllers/settlementController.js";

const routes = express.Router();

routes.post("/settlements", SettlementController.createSettlement);
routes.get("/settlements", SettlementController.getAllSettlements);
routes.get("/settlements/:id", SettlementController.getSettlementById);
routes.put("/settlements/:id", SettlementController.updateSettlement);
routes.delete("/settlements/:id", SettlementController.deleteSettlement);

export default routes;
