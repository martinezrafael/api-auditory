import SettlementService from "../services/SettlementService.js";

class SettlementController {
  static createSettlement = async (req, res) => {
    const settlement = await SettlementService.create(req.body);
    res.status(201).json({
      message: "Liquidação cadastrada com sucesso.",
      settlement: settlement,
    });
  };

  static getAllSettlements = async (req, res) => {
    const allSettlements = await SettlementService.getAll();
    res.status(200).json(allSettlements);
  };

  static getSettlementById = async (req, res) => {
    const settlement = await SettlementService.getById(req.params.id);
    res.status(200).json(settlement);
  };

  static updateSettlement = async (req, res) => {
    const settlement = await SettlementService.update(req.params.id, req.body);
    res.status(200).json({
      message: "Dados da liquidação atualizados com sucesso.",
      settlement: settlement,
    });
  };

  static deleteSettlement = async (req, res) => {
    await SettlementService.delete(req.params.id);
    res.status(200).json({
      message: "Dados da liquidação deletados com sucesso.",
    });
  };
}

export default SettlementController;
