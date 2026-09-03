import express from "express";
import creditOfferController from "../controllers/CreditOfferController.js";

const router = express.Router();

router.post("/credit-offers", creditOfferController.create);
router.get("/credit-offers", creditOfferController.getAll);
router.get("/credit-offers/:id", creditOfferController.getById);
router.put("/credit-offers/:id", creditOfferController.update);
router.delete("/credit-offers/:id", creditOfferController.delete);

export default router;
