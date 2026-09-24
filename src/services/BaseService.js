/**
 * Classe base genérica para a camada de serviço (Service Layer).
 * Contém a lógica de negócio genérica e intermediante entre os Controllers e os Repositórios.
 *
 * @class BaseService
 */
class BaseService {
  /**
   * Instancia a classe de serviço injetando o repositório correspondente.
   *
   * @param {Object} repository - Instância do repositório responsável pelas operações de banco de dados.
   */
  constructor(repository) {
    /**
     * Instância do repositório injetado.
     * @type {Object}
     */
    this.repository = repository;
  }

  /**
   * Executa a criação de um novo registro repassando os dados ao repositório.
   *
   * @param {Object} data - Dados para a criação do registro.
   * @returns {Promise<Object>} Promessa contendo o objeto criado.
   */
  async create(data) {
    return this.repository.create(data);
  }

  /**
   * Obtém todos os registros cadastrados no repositório.
   *
   * @returns {Promise<Array<Object>>} Promessa contendo a lista de todos os registros.
   */
  async getAll() {
    return this.repository.findAll();
  }

  /**
   * Busca um registro específico no repositório através do seu ID.
   *
   * @param {string} id - Identificador único do registro.
   * @returns {Promise<Object|null>} Promessa contendo o registro encontrado ou null.
   */
  async getById(id) {
    return this.repository.findById(id);
  }

  /**
   * Atualiza os dados de um registro existente através do seu ID.
   *
   * @param {string} id - Identificador único do registro a ser atualizado.
   * @param {Object} data - Objeto contendo as novas informações a serem aplicadas.
   * @returns {Promise<Object|null>} Promessa contendo o registro já atualizado.
   */
  async update(id, data) {
    return this.repository.update(id, data);
  }

  /**
   * Remove um registro do banco de dados através do seu ID.
   *
   * @param {string} id - Identificador único do registro a ser excluído.
   * @returns {Promise<Object|null>} Promessa contendo o registro que foi removido.
   */
  async delete(id) {
    return this.repository.delete(id);
  }
}

export default BaseService;
