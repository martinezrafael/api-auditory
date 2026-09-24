import BaseController from "./BaseController.js";
import companyService from "../services/CompanyService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Empresas.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
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
}

/**
 * Instância única (Singleton) do controller de Empresas para utilização na camada de rotas.
 * @type {CompanyController}
 */
export default new CompanyController();
