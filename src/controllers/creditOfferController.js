import CreditOfferService from "../services/CreditOfferService.js";

class CreditOfferController {
  static createCreditOffer = async (req, res) => {
    const creditOffer = await CreditOfferService.create(req.body);
    res.status(201).json({
      message: "Oferta de crédito criada com sucesso.",
      creditOffer: creditOffer,
    });
  };

  static getAllCreditOffers = async (req, res) => {
    const allCreditOffers = await CreditOfferService.getAll();
    res.status(200).json(allCreditOffers);
  };

  static getCreditOfferById = async (req, res) => {
    const creditOffer = await CreditOfferService.getById(req.params.id);
    res.status(200).json(creditOffer);
  };

  static updateCreditOffer = async (req, res) => {
    const creditOffer = await CreditOfferService.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Dados da oferta de crédito atualizados com sucesso.",
      creditOffer: creditOffer,
    });
  };

  static deleteCreditOffer = async (req, res) => {
    await CreditOfferService.delete(req.params.id);
    res.status(200).json({
      message: "Dados da oferta de crédito deletados com sucesso.",
    });
  };
}

export default CreditOfferController;
