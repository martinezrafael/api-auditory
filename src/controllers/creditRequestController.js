import CreditRequestService from "../services/CreditRequestService.js";

class CreditRequestController {
  static createCreditRequest = async (req, res) => {
    const creditRequest = await CreditRequestService.create(req.body);
    res.status(201).json({
      message: "Solicitação de crédito criada com sucesso.",
      creditRequest: creditRequest,
    });
  };

  static getAllCreditRequests = async (req, res) => {
    const allCreditRequests = await CreditRequestService.getAll();
    res.status(200).json(allCreditRequests);
  };

  static getCreditRequestById = async (req, res) => {
    const creditRequest = await CreditRequestService.getById(req.params.id);
    res.status(200).json(creditRequest);
  };

  static updateCreditRequest = async (req, res) => {
    const creditRequest = await CreditRequestService.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Dados da solicitação de crédito atualizadas com sucesso.",
      creditRequest: creditRequest,
    });
  };

  static deleteCreditRequest = async (req, res) => {
    await CreditRequestService.delete(req.params.id);
    res.status(200).json({
      message: "Dados da solicitação de crédito deletados com sucesso.",
    });
  };
}

export default CreditRequestController;
