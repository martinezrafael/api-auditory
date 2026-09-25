import BaseController from "./BaseController.js";
import documentService from "../services/DocumentService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Documentos (`Document`).
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class DocumentController
 * @extends {BaseController}
 */
class DocumentController extends BaseController {
  /**
   * Instancia o `DocumentController` injetando o serviço de documentos (`documentService`).
   */
  constructor() {
    super(documentService);
  }
}

/**
 * Instância única (Singleton) do controller de Documentos para utilização na camada de rotas.
 * @type {DocumentController}
 */
export default new DocumentController();
