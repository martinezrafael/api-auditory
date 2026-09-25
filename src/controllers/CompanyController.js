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
   * Handler para a criação atômica de uma empresa e do seu usuário inicial (`POST /companies/with-user`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição do Express contendo `companyData` e `userData` no corpo (`req.body`).
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 contendo a mensagem de sucesso e os dados da empresa e usuário criados.
   */
  createWithUser = async (req, res, next) => {
    try {
      const result = await this.service.createWithUser(req.body);
      return res.status(201).json({
        message: "Empresa e usuário criados com sucesso.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handler para associar um novo usuário a uma empresa existente (`POST /companies/:id/users`).
   *
   * @async
   * @param {import("express").Request} req - Objeto de requisição do Express contendo o ID da empresa em `req.params.id` e os dados do usuário em `req.body`.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware do Express para encaminhamento de erros.
   * @returns {Promise<import("express").Response>} Resposta HTTP 201 contendo a mensagem de sucesso e o documento do usuário criado.
   */
  addUser = async (req, res, next) => {
    try {
      const user = await this.service.addUserToCompany(req.params.id, req.body);
      return res.status(201).json({
        message: "Usuário adicionado à empresa com sucesso.",
        data: user,
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
