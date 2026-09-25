import BaseRepository from "./BaseRepository.js";
import documentModel from "../models/DocumentModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Documento (`Document`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class DocumentRepository
 * @extends {BaseRepository}
 */
class DocumentRepository extends BaseRepository {
  /**
   * Instancia o `DocumentRepository` repassando o modelo de dados de documentos (`documentModel`) para a classe base.
   */
  constructor() {
    super(documentModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Documentos pronta para uso na camada de serviços.
 * @type {DocumentRepository}
 */
export default new DocumentRepository();
