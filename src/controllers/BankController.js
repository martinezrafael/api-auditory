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

  /* =========================================================================
   * MÉTODOS ESPECÍFICOS / CUSTOMIZADOS (CONTAS BANCÁRIAS)
   * ========================================================================= */

  /**
   * Adiciona e vincula uma nova conta bancária a um banco existente.
   *
   * @route POST /banks/:bankId/accounts
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `bankId` em `req.params` e dados da conta em `req.body`.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 com os dados da conta criada.
   */
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

  /**
   * Recupera a lista de todas as contas bancárias associadas a um banco específico.
   *
   * @route GET /banks/:bankId/accounts
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `bankId` em `req.params`.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com a lista de contas bancárias.
   */
  getAccountsByBank = async (req, res, next) => {
    try {
      const { bankId } = req.params;
      const accounts = await this.service.getAccountsByBankId(bankId);
      return res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Busca os detalhes de uma conta bancária específica vinculada a um banco.
   *
   * @route GET /banks/:bankId/accounts/:accountId
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `bankId` e `accountId` em `req.params`.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com os dados da conta encontrada.
   */
  getAccountByBank = async (req, res, next) => {
    try {
      const { bankId, accountId } = req.params;
      const account = await this.service.getAccountByBankIdAndAccountId(
        bankId,
        accountId,
      );
      return res.status(200).json(account);
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
