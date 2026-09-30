import BaseController from "./BaseController.js";
import companyService from "../services/CompanyService.js";

/**
 * Controller responsável por manipular as requisições HTTP da entidade Company.
 * Herda as operações genéricas de CRUD da classe BaseController e expõe
 * endpoints específicos para a gestão do relacionamento entre Empresas, Usuários e Bancos.
 *
 * @class CompanyController
 * @extends {BaseController}
 */
class CompanyController extends BaseController {
  /**
   * Inicializa o controller injetando a instância de CompanyService na classe pai.
   *
   * =========================================================================
   * MÉTODOS HERDADOS DO BASECONTROLLER:
   * =========================================================================
   * - getAll(req, res, next)    -> GET    /companies
   * - getById(req, res, next)   -> GET    /companies/:id
   * - create(req, res, next)    -> POST   /companies
   * - update(req, res, next)    -> PUT    /companies/:id
   * - delete(req, res, next)    -> DELETE /companies/:id
   * =========================================================================
   */
  constructor() {
    super(companyService);
  }

  /* =========================================================================
   * MÉTODOS ESPECÍFICOS / CUSTOMIZADOS (BANCOS)
   * ========================================================================= */

  /**
   * Adiciona um novo registro/conta bancária a uma empresa já existente.
   *
   * @route POST /companies/:companyId/banks
   * @async
   * @param {import("express").Request} req - Requisição com `companyId` nos parâmetros e dados do banco no corpo.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 com os dados bancários criados.
   */
  addBankToCompany = async (req, res, next) => {
    try {
      const { companyId } = req.params;
      const bank = await this.service.addBankToCompany(companyId, req.body);
      return res.status(201).json({
        message: "Banco vinculado à empresa com sucesso.",
        data: bank,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Recupera a lista de todas as contas bancárias associadas a uma empresa específica.
   *
   * @route GET /companies/:companyId/banks
   * @async
   * @param {import("express").Request} req - Requisição contendo o ID da empresa em `req.params.companyId`.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com o array de bancos.
   */
  getBanksByCompany = async (req, res, next) => {
    try {
      const { companyId } = req.params;
      const banks = await this.service.getBanksByCompanyId(companyId);
      return res.status(200).json(banks);
    } catch (error) {
      next(error);
    }
  };

  getBankByCompany = async (req, res, next) => {
    try {
      const { companyId, bankId } = req.params;
      const bank = await this.service.getBankWithCompanyIdAndBankId(
        companyId,
        bankId,
      );
      return res.status(200).json(bank);
    } catch (error) {
      next(error);
    }
  };

  /* =========================================================================
   * MÉTODOS ESPECÍFICOS / CUSTOMIZADOS (USUÁRIOS)
   * ========================================================================= */

  /**
   * Cria uma nova empresa e o seu usuário administrador inicial em uma única transação atômica.
   *
   * @route POST /companies/users
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `companyData` e `userData` em `req.body`.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 com os dados da empresa e usuário criados.
   */
  createCompanyWithUser = async (req, res, next) => {
    try {
      const result = await this.service.createCompanyWithUser(req.body);
      return res.status(201).json({
        message: "Empresa e usuário criados com sucesso.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Adiciona um novo usuário a uma empresa já existente.
   *
   * @route POST /companies/:companyId/users
   * @async
   * @param {import("express").Request} req - Requisição com `companyId` nos parâmetros e dados do usuário no corpo.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 com o usuário criado.
   */
  addUserToCompany = async (req, res, next) => {
    try {
      const { companyId } = req.params;
      const user = await this.service.addUserToCompany(companyId, req.body);
      return res.status(201).json({
        message: "Usuário vinculado à empresa com sucesso.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Recupera a lista de todos os usuários associados a uma empresa específica.
   *
   * @route GET /companies/:companyId/users
   * @async
   * @param {import("express").Request} req - Requisição contendo o ID da empresa em `req.params.companyId`.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com o array de usuários.
   */
  getUsersByCompany = async (req, res, next) => {
    try {
      const { companyId } = req.params;
      const users = await this.service.getUsersByCompanyId(companyId);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Busca um usuário específico dentro do contexto de uma determinada empresa.
   *
   * @route GET /companies/:companyId/users/:userId
   * @async
   * @param {import("express").Request} req - Requisição com `companyId` e `userId` nos parâmetros da URL.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com os dados do usuário.
   */
  getUserByCompany = async (req, res, next) => {
    try {
      const { companyId, userId } = req.params;
      const user = await this.service.getUserByCompanyIdAndUserId(
        companyId,
        userId,
      );
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Atualiza as informações de um usuário pertencente a uma empresa específica.
   *
   * @route PUT /companies/:companyId/users/:userId
   * @async
   * @param {import("express").Request} req - Requisição com IDs nos parâmetros e novos dados no corpo.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com os dados atualizados.
   */
  updateUserByCompany = async (req, res, next) => {
    try {
      const { companyId, userId } = req.params;
      const updatedUser = await this.service.updateUserByCompany(
        companyId,
        userId,
        req.body,
      );
      return res.status(200).json({
        message: "Usuário atualizado com sucesso.",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove ou desativa a associação de um usuário com uma empresa específica.
   *
   * @route DELETE /companies/:companyId/users/:userId
   * @async
   * @param {import("express").Request} req - Requisição contendo `companyId` e `userId` nos parâmetros.
   * @param {import("express").Response} res - Objeto de resposta HTTP.
   * @param {import("express").NextFunction} next - Middleware para tratamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com a confirmação da remoção.
   */
  deleteUserByCompany = async (req, res, next) => {
    try {
      const { companyId, userId } = req.params;
      await this.service.deleteUserByCompany(companyId, userId);
      return res.status(200).json({
        message: "Usuário removido da empresa com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Instância exportada como Singleton para ser utilizada diretamente no arquivo de rotas.
 */
export default new CompanyController();
