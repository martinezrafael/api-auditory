class BaseService {
  // O construtor recebe uma instância do repositório e a armazena na propriedade this.repository
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * O método create recebe o parâmetro data com os dados a serem criados,
   * repassa esses dados chamando o método .create(data) de this.repository
   * e retorna a promessa com o novo registro criado.
   */
  async create(data) {
    return this.repository.create(data);
  }

  /**
   * O método getAll não recebe parâmetros,
   * chama o método .findAll() de this.repository
   * e retorna a lista com todos os registros encontrados.
   */
  async getAll() {
    return this.repository.findAll();
  }

  /**
   * O método getById recebe o ID do registro como parâmetro,
   * chama o método .findById(id) de this.repository
   * e retorna o registro correspondente ao ID informado.
   */
  async getById(id) {
    return this.repository.findById(id);
  }

  /**
   * O método update recebe o ID e o parâmetro data com os novos dados,
   * chama o método .update(id, data) de this.repository
   * e retorna o registro atualizado.
   */
  async update(id, data) {
    return this.repository.update(id, data);
  }

  /**
   * O método delete recebe o ID do registro a ser removido,
   * chama o método .delete(id) de this.repository
   * e retorna o registro que foi excluído.
   */
  async delete(id) {
    return this.repository.delete(id);
  }
}

export default BaseService;
