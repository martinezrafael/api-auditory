import BaseRepository from "./BaseRepository.js";
import auditModel from "../models/AuditModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Auditoria (`Audit`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class AuditRepository
 * @extends {BaseRepository}
 */
class AuditRepository extends BaseRepository {
  /**
   * Instancia o `AuditRepository` repassando o modelo de dados de auditoria (`auditModel`) para a classe base.
   */
  constructor() {
    super(auditModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Auditoria pronta para uso na camada de serviços.
 * @type {AuditRepository}
 */
export default new AuditRepository();
