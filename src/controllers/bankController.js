import NotFoundError from "../errors/NotFoundError.js";
import bankModel from "../models/identity/Bank.js";

class bankController {
  static createBank = async (req, res, next) => {
    try {
      const bankCreated = new bankModel(req.body);
      const bankSaved = await bankCreated.save();

      res.status(201).json({
        message: "Instituição bancária cadastrada com sucesso.",
        bank: bankSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllBanks = async (req, res, next) => {
    try {
      const allBanks = await bankModel.find();
      res.status(200).json(allBanks);
    } catch (error) {
      next(error);
    }
  };

  static getBankById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const bank = await bankModel.findById(id);

      if (!bank) {
        return next(new NotFoundError("Instituição bancária não localizada."));
      }

      res.status(200).json(bank);
    } catch (error) {
      next(error);
    }
  };

  static updateBank = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const bank = await bankModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!bank) {
        return next(new NotFoundError("Instituição bancária não localizada."));
      }

      res.status(200).json({
        message: "Dados da instituição bancária atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteBank = async (req, res, next) => {
    try {
      const { id } = req.params;
      const bank = await bankModel.findByIdAndDelete(id);

      if (!bank) {
        return next(new NotFoundError("Instituição bancária não localizada"));
      }

      res.status(200).json({
        message: "Dados da instituição bancária deletados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default bankController;
