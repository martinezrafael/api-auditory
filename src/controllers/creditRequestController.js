import NotFoundError from "../errors/NotFoundError.js";
import creditRequestModel from "../models/credit/CreditRequest.js";

class CreditRequestController {
  static createCreditRequest = async (req, res, next) => {
    try {
      const creditRequestCreated = new creditRequestModel(req.body);
      const creditRequestSaved = await creditRequestCreated.save();

      res.status(201).json({
        message: "Solicitação de crédito criada com sucesso.",
        creditRequest: creditRequestSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllCreditRequests = async (req, res, next) => {
    try {
      const allCreditRequests = await creditRequestModel.find();
      res.status(200).json(allCreditRequests);
    } catch (error) {
      next(error);
    }
  };

  static getCreditRequestById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const creditRequest = await creditRequestModel.findById(id);

      if (!creditRequest) {
        return next(
          new NotFoundError("Solicitação de crédito não localizada."),
        );
      }

      res.status(200).json(creditRequest);
    } catch (error) {
      next(error);
    }
  };

  static updateCreditRequest = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const creditRequest = await creditRequestModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!creditRequest) {
        return next(
          new NotFoundError("Solicitação de crédito não localizada."),
        );
      }

      res.status(200).json({
        message: "Dados da solicitação de crédito atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteCreditRequest = async (req, res, next) => {
    try {
      const { id } = req.params;
      const creditRequest = await creditRequestModel.findByIdAndDelete(id);

      if (!creditRequest) {
        return next(
          new NotFoundError("Solicitação de crédito não localizada."),
        );
      }

      res.status(200).json({
        message: "Solicitação de crédito deletada com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CreditRequestController;
