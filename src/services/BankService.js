import BaseService from "./BaseService.js";
import BankRepository from "../database/repositories/BankRepository.js";
import BankAccountRepository from "../database/repositories/BankAccountRepository.js";

/**
 * Serviço responsável por conter as regras de negócio relativas à entidade de Bancos.
 * Herda os métodos genéricos da camada de serviço (`BaseService`) e utiliza o `BankRepository` para persistência.
 *
 * @class BankService
 * @extends {BaseService}
 */
class BankService extends BaseService {
  /**
   * Instancia o `BankService` fornecendo o `BankRepository` para a classe base.
   */
  constructor() {
    super(BankRepository);
  }

  /* =========================================================================
   * MÉTODOS PRIVADOS & UTILITÁRIOS
   * ========================================================================= */

  /**
   * Método auxiliar para criação de objetos de Erro com código de status HTTP.
   *
   * @private
   * @param {string} message - Mensagem do erro.
   * @param {number} statusCode - Código de status HTTP.
   * @returns {Error} Objeto de Erro configurado.
   */
  #createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  /* =========================================================================
   * MÉTODOS ESPECÍFICOS / CUSTOMIZADOS (Regras de Negócio & Relacionamentos)
   * ========================================================================= */

  /**
   * Sobrescreve o método `create` para validar se o código do banco e o CNPJ já estão cadastrados antes de salvar.
   *
   * @async
   * @param {Object} data - Dados do banco a ser criado.
   * @param {string} data.bankCode - Código COMPE/ISPB do banco.
   * @param {string} data.documentNumber - CNPJ da instituição bancária.
   * @returns {Promise<Object>} Documento do banco criado.
   * @throws {Error} Lança erro 400 caso o código do banco ou o CNPJ já estejam cadastrados.
   */
  async create(data) {
    const { bankCode, documentNumber } = data;

    const existingBankCode = await this.repository.findByBankCode(bankCode);

    if (existingBankCode) {
      const error = new Error(
        "Este código de banco já está em uso no sistema.",
      );
      error.statusCode = 400;
      throw error;
    }

    const existingCnpj = await this.repository.findByCnpj(documentNumber);
    if (existingCnpj) {
      const error = new Error("Este CNPJ já está em uso no sistema.");
      error.statusCode = 400;
      throw error;
    }

    const bank = await super.create(data);
    return bank;
  }

  /**
   * Associa e cadastra uma nova conta bancária a uma instituição bancária previamente cadastrada.
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} bankId - ID único do banco existente.
   * @param {Object} accountData - Dados da conta bancária a ser cadastrada e vinculada.
   * @returns {Promise<Object>} O documento da conta bancária criada.
   * @throws {Error} Lança erro 400 se `accountData` for omitido, 409 se o número da conta já estiver cadastrado para este banco, e 404 se o banco não for encontrado.
   */
  async addAccountToBank(bankId, accountData) {
    if (!accountData) {
      throw this.#createError(
        "Os dados da conta ('accountData') são obrigatórios.",
        400,
      );
    }

    const bank = await this.getById(bankId);

    const existingAccount = await BankAccountRepository.findOneByBank(
      bank._id,
      {
        accountNumber: accountData.accountNumber,
      },
    );

    if (existingAccount) {
      throw this.#createError("Esta conta já está cadastrada.", 409);
    }

    return BankAccountRepository.create({
      ...accountData,
      bank: bank._id,
    });
  }

  /**
   * Retorna a lista de contas bancárias vinculadas a um banco específico.
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} bankId - ID único do banco.
   * @returns {Promise<Object[]>} Lista de contas bancárias do banco.
   * @throws {Error} Lança erro com `statusCode = 404` se o banco não for encontrado.
   */
  async getAccountsByBankId(bankId) {
    await this.getById(bankId);
    return BankAccountRepository.findByBankId(bankId);
  }

  /**
   * Busca uma conta bancária específica vinculada a um banco pelo ID da conta e do banco.
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} bankId - ID único do banco.
   * @param {string|import("mongoose").Types.ObjectId} accountId - ID único da conta bancária.
   * @returns {Promise<Object>} Dados da conta bancária localizada.
   * @throws {Error} Lança erro 404 se o banco ou a conta não forem localizados/não estiverem vinculados.
   */
  async getAccountByBankIdAndAccountId(bankId, accountId) {
    await this.getById(bankId);

    const account = await BankAccountRepository.findByBankIdAndAccountId(
      bankId,
      accountId,
    );

    if (!account) {
      throw this.#createError("Conta não encontrada", 404);
    }

    return account;
  }
}

/**
 * Instância única (Singleton) do serviço de Bancos pronta para ser utilizada pelos controllers.
 * @type {BankService}
 */
export default new BankService();
