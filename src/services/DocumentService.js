import BaseService from "./BaseService.js";
import documentRepository from "../database/repositories/DocumentRepository.js";

/**
 * Serviço responsável por concentrar a regra de negócio do recurso de Documentos (`Document`).
 * Extende `BaseService`, herdando as operações fundamentais de dados (`create`, `findAll`, `findById`, `update`, `delete`).
 *
 * @class DocumentService
 * @extends {BaseService}
 */
class DocumentService extends BaseService {
  /**
   * Instancia o `DocumentService` injetando o repositório de documentos (`documentRepository`).
   */
  constructor() {
    super(documentRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Documentos.
 * @type {DocumentService}
 */
export default new DocumentService();
