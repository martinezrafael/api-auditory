import NotFoundError from "../errors/NotFoundError.js";
import bankAccountModel from "../models/banking/BankAccount.js";

class BankAccountController {
  static createBankAccount = async (req, res, next) => {
    try {
      const bankAccountCreated = new bankAccountModel(req.body);
      const bankAccountSaved = await bankAccountCreated.save();

      res.status(201).json({
        message: "Conta bancária cadastrada com sucesso.",
        bankAccount: bankAccountSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllBankAccounts = async (req, res, next) => {
    try {
      const allBankAccounts = await bankAccountModel.find();
      res.status(200).json(allBankAccounts);
    } catch (error) {
      next(error);
    }
  };

  static getBankAccountById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const bankAccount = await bankAccountModel.findById(id);

      if (!bankAccount) {
        return next(new NotFoundError("Conta bancária não localizada."));
      }

      res.status(200).json(bankAccount);
    } catch (error) {
      next(error);
    }
  };

  static updateBankAccount = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const bankAccount = await bankAccountModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!bankAccount) {
        return next(new NotFoundError("Conta bancária não localizada."));
      }

      res.status(200).json({
        message: "Dados da conta bancária atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteBankAccount = async (req, res, next) => {
    try {
      const { id } = req.params;

      const bankAccount = await bankAccountModel.findByIdAndDelete(id);

      if (!bankAccount) {
        return next(new NotFoundError("Conta bancária não localizada."));
      }

      res.status(200).json({
        message: "Conta bancária deletada com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BankAccountController;
