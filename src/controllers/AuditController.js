import BaseController from "./BaseController.js";
import auditService from "../services/AuditService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Auditoria.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class AuditController
 * @extends {BaseController}
 */
class AuditController extends BaseController {
  /**
   * Instancia o `AuditController` injetando o serviço de auditoria (`auditService`).
   */
  constructor() {
    super(auditService);
  }
}

/**
 * Instância única (Singleton) do controller de Auditoria para utilização na camada de rotas.
 * @type {AuditController}
 */
export default new AuditController();
