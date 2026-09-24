import BaseService from "./BaseService.js";
import bankRepository from "../database/repositories/BankRepository.js";

/**
 * Serviço responsável por conter as regras de negócio relativas à entidade de Bancos.
 * Herda os métodos genéricos da camada de serviço (`BaseService`) e utiliza o `BankRepository` para persistência.
 *
 * @class BankService
 * @extends {BaseService}
 */
class BankService extends BaseService {
  /**
   * Instancia o `BankService` fornecendo o `bankRepository` para a classe base.
   */
  constructor() {
    super(bankRepository);
  }

  /**
   * Sobrescreve o método `create` para validar se o código do banco e o CNPJ já estão cadastrados antes de salvar.
   *
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
}

/**
 * Instância única (Singleton) do serviço de Bancos pronta para ser utilizada pelos controllers.
 * @type {BankService}
 */
export default new BankService();
