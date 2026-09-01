import express from "express";
import BankController from "../controllers/bankController.js";

const routes = express.Router();

routes.post("/banks", BankController.createBank);
routes.get("/banks", BankController.getAllBanks);
routes.get("/banks/:id", BankController.getBankById);
routes.put("/banks/:id", BankController.updateBank);
routes.delete("/banks/:id", BankController.deleteBank);

export default routes;
