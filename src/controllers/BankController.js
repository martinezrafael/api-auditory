import BaseController from "./BaseController.js";
import bankService from "../services/BankService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Bancos.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class BankController
 * @extends {BaseController}
 */
class BankController extends BaseController {
  /**
   * Instancia o `BankController` injetando o serviço de bancos (`bankService`).
   */
  constructor() {
    super(bankService);
  }

  addAccountToBank = async (req, res, next) => {
    try {
      const { bankId } = req.params;
      const account = await this.service.addAccountToBank(bankId, req.body);
      return res.status(201).json({
        message: "Conta bancária vinculada com sucesso.",
        data: account,
      });
    } catch (error) {
      next(error);
    }
  };

  getAccountsByBank = async (req, res, next) => {
    try {
      const { bankId } = req.params;
      const accounts = await this.service.getAccountsByBankId(bankId);
      return res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Instância única (Singleton) do controller de Bancos para utilização na camada de rotas.
 * @type {BankController}
 */
export default new BankController();
