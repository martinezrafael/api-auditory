import express from "express";
import bankController from "../controllers/bankController.js";

const routes = express.Router();

routes.post("/banks", bankController.createBank);
routes.get("/banks", bankController.getAllBanks);
routes.get("/banks/:id", bankController.getBankById);
routes.put("/banks/:id", bankController.updateBank);
routes.delete("/banks/:id", bankController.deleteBank);

export default routes;
