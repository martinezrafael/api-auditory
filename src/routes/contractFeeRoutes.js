import { Router } from "express";
import contractFeeController from "../controllers/ContractFeeController.js";

const router = Router();

router
  .get("/contract-fees", contractFeeController.getAll)
  .get("/contract-fees/:id", contractFeeController.getById)
  .post("/contract-fees", contractFeeController.create)
  .put("/contract-fees/:id", contractFeeController.update)
  .delete("/contract-fees/:id", contractFeeController.delete);

export default router;
