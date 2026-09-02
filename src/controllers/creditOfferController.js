import NotFoundError from "../errors/NotFoundError.js";
import creditOfferModel from "../models/credit/CreditOffer.js";

class CreditOfferController {
  static createCreditOffer = async (req, res, next) => {
    try {
      const creditOfferCreated = new creditOfferModel(req.body);
      const creditOfferSaved = await creditOfferCreated.save();

      res.status(201).json({
        message: "Oferta de crédito criada com sucesso.",
        creditOffer: creditOfferSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllCreditOffers = async (req, res, next) => {
    try {
      const allCreditOffers = await creditOfferModel.find();
      res.status(200).json(allCreditOffers);
    } catch (error) {
      next(error);
    }
  };

  static getCreditOfferById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const creditOffer = await creditOfferModel.findById(id);

      if (!creditOffer) {
        return next(new NotFoundError("Oferta de crédito não localizada."));
      }

      res.status(200).json(creditOffer);
    } catch (error) {
      next(error);
    }
  };

  static updateCreditOffer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const creditOffer = await creditOfferModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!creditOffer) {
        return next(new NotFoundError("Oferta de crédito não localizada."));
      }

      res.status(200).json({
        message: "Oferta de crédito atualizada com sucesso.",
        creditOffer,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteCreditOffer = async (req, res, next) => {
    try {
      const { id } = req.params;

      const creditOffer = await creditOfferModel.findByIdAndDelete(id);

      if (!creditOffer) {
        return next(new NotFoundError("Oferta de crédito não localizada."));
      }

      res.status(200).json({
        message: "Oferta de crédito deletada com sucesso.",
        creditOffer,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CreditOfferController;
