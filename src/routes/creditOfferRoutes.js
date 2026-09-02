import express from "express";
import creditOfferController from "../controllers/creditOfferController.js";

const router = express.Router();

router.get("/credit-offers", creditOfferController.getAllCreditOffers);
router.get("/credit-offers/:id", creditOfferController.getCreditOfferById);
router.post("/credit-offers", creditOfferController.createCreditOffer);
router.put("/credit-offers/:id", creditOfferController.updateCreditOffer);
router.delete("/credit-offers/:id", creditOfferController.deleteCreditOffer);

export default router;
