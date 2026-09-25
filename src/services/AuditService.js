import BaseService from "./BaseService.js";
import auditRepository from "../database/repositories/AuditRepository.js";

/**
 * Serviço responsável por conter as regras de negócio relativas aos registros de Auditoria.
 * Herda os métodos genéricos da camada de serviço (`BaseService`) e utiliza o `AuditRepository` para persistência.
 *
 * @class AuditService
 * @extends {BaseService}
 */
class AuditService extends BaseService {
  /**
   * Instancia o `AuditService` fornecendo o `auditRepository` para a classe base.
   */
  constructor() {
    super(auditRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Auditoria pronta para ser utilizada pelos controllers.
 * @type {AuditService}
 */
export default new AuditService();
