import bankAccountService from "../services/BankAccountService.js";

class BankAccountController {
  static createBankAccount = async (req, res) => {
    const bankAccountSaved = await bankAccountService.create(req.body);
    res.status(201).json({
      message: "Conta bancária cadastrada com sucesso.",
      bankAccount: bankAccountSaved,
    });
  };

  static getAllBankAccounts = async (req, res) => {
    const allBankAccounts = await bankAccountService.getAll();
    res.status(200).json(allBankAccounts);
  };

  static getBankAccountById = async (req, res) => {
    const bankAccount = await bankAccountService.getById(req.params.id);
    res.status(200).json(bankAccount);
  };

  static updateBankAccount = async (req, res) => {
    const bankAccountUpdated = await bankAccountService.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Dados da conta bancária atualizados com sucesso.",
      bankAccount: bankAccountUpdated,
    });
  };

  static deleteBankAccount = async (req, res) => {
    await bankAccountService.delete(req.params.id);
    res.status(200).json({
      message: "Conta bancária deletada com sucesso.",
    });
  };
}

export default BankAccountController;
