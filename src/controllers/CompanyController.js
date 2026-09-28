import BaseController from "./BaseController.js";
import companyService from "../services/CompanyService.js";

/**
 * Controller responsável por manipular as requisições HTTP do recurso de Empresas (`Company`).
 * Extende a classe `BaseController` para herdar os handlers genéricos de CRUD (`getAll`, `getById`, `create`, `update`, `delete`).
 *
 * @class CompanyController
 * @extends {BaseController}
 */
class CompanyController extends BaseController {
  /**
   * Instancia o `CompanyController` injetando o serviço de empresas (`companyService`).
   */
  constructor() {
    super(companyService);
  }

  /**
   * Handler para a criação atômica de uma empresa e do seu usuário inicial (`POST /companies/users`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição do Express contendo `companyData` e `userData` no corpo (`req.body`).
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 contendo os dados da empresa e usuário criados.
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
   * Handler para associar um novo usuário a uma empresa existente (`POST /companies/:companyId/users`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição do Express contendo `companyId` em `req.params` e os dados do usuário em `req.body`.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 contendo o documento do usuário criado.
   */
  addUserToCompany = async (req, res, next) => {
    try {
      const { companyId } = req.params;
      const user = await this.service.addUserToCompany(companyId, req.body);
      return res.status(201).json({
        message: "Usuário adicionado à empresa com sucesso.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handler para listar todos os usuários de uma empresa específica (`GET /companies/:companyId/users`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição do Express contendo `companyId` em `req.params`.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 contendo a lista de usuários da empresa.
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
   * Handler para buscar um usuário específico atrelado a uma empresa (`GET /companies/:companyId/users/:userId`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `companyId` e `userId` em `req.params`.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com os dados do usuário encontrado.
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
   * Handler para atualizar os dados de um usuário atrelado a uma empresa (`PUT /companies/:companyId/users/:userId`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `companyId` e `userId` em `req.params` e novos dados em `req.body`.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 com os dados do usuário atualizado.
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
   * Handler para desativar (soft delete) um usuário atrelado a uma empresa (`DELETE /companies/:companyId/users/:userId`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição contendo `companyId` e `userId` em `req.params`.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 200 confirmando a remoção do usuário.
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
 * Instância única (Singleton) do controller de Empresas para utilização na camada de rotas.
 * @type {CompanyController}
 */
export default new CompanyController();
