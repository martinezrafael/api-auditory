import NotFoundError from "../errors/NotFoundError.js";
import settlementModel from "../models/acquiring/Settlement.js";

class SettlementController {
  static createSettlement = async (req, res, next) => {
    try {
      const settlementCreated = new settlementModel(req.body);
      const settlementSaved = await settlementCreated.save();

      res.status(201).json({
        message: "Liquidação criada com sucesso.",
        settlement: settlementSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllSettlements = async (req, res, next) => {
    try {
      const allSettlements = await settlementModel.find();
      res.status(200).json(allSettlements);
    } catch (error) {
      next(error);
    }
  };

  static getSettlementById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const settlement = await settlementModel.findById(id);

      if (!settlement) {
        return next(new NotFoundError("Liquidação não localizada."));
      }

      res.status(200).json(settlement);
    } catch (error) {
      next(error);
    }
  };

  static updateSettlement = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const settlement = await settlementModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!settlement) {
        return next(new NotFoundError("Liquidação não localizada."));
      }

      res.status(200).json({
        message: "Dados da liquidação atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SettlementController;
