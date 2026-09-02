import bankService from "../services/BankService.js";

class BankController {
  static createBank = async (req, res) => {
    const bankSaved = await bankService.create(req.body);
    res.status(201).json({
      message: "Instituição bancária cadastrada com sucesso.",
      bank: bankSaved,
    });
  };

  static getAllBanks = async (req, res) => {
    const allBanks = await bankService.getAll();
    res.status(200).json(allBanks);
  };

  static getBankById = async (req, res) => {
    const bank = await bankService.getById(req.params.id);
    res.status(200).json(bank);
  };

  static updateBank = async (req, res) => {
    const bankUpdated = await bankService.update(req.params.id, req.body);
    res.status(200).json({
      message: "Dados da instituição bancária atualizados com sucesso.",
      bank: bankUpdated,
    });
  };

  static deleteBank = async (req, res) => {
    await bankService.delete(req.params.id);
    res.status(200).json({
      message: "Instituição bancária removida com sucesso.",
    });
  };
}

export default BankController;
