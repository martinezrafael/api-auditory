import express from "express";
import creditRequestController from "../controllers/CreditRequestController.js";

const router = express.Router();

router.post("/credit-requests", creditRequestController.create);
router.get("/credit-requests", creditRequestController.getAll);
router.get("/credit-requests/:id", creditRequestController.getById);
router.put("/credit-requests/:id", creditRequestController.update);
router.delete("/credit-requests/:id", creditRequestController.delete);

export default router;
