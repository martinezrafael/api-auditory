import express from "express";
import creditRequestController from "../controllers/creditRequestController.js";

const router = express.Router();

router.post("/", creditRequestController.createCreditRequest);
router.get("/", creditRequestController.getAllCreditRequests);
router.get("/:id", creditRequestController.getCreditRequestById);
router.put("/:id", creditRequestController.updateCreditRequest);

export default router;
