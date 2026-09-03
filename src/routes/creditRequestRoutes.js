import express from "express";
import creditRequestController from "../controllers/creditRequestController.js";

const router = express.Router();

router.post("/credit-requests", creditRequestController.createCreditRequest);
router.get("/credit-requests", creditRequestController.getAllCreditRequests);
router.get(
  "/credit-requests/:id",
  creditRequestController.getCreditRequestById,
);
router.put("/credit-requests/:id", creditRequestController.updateCreditRequest);
router.delete(
  "/credit-requests/:id",
  creditRequestController.deleteCreditRequest,
);

export default router;
