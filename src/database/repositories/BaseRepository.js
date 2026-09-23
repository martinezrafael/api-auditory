class BaseRepository {
  // O construtor recebe o Model do Mongoose e o armazena na propriedade this.model
  constructor(model) {
    this.model = model;
  }

  /**
   * O método create recebe um parâmetro data,
   * cria uma constante document que recebe uma nova instância de this.model com os dados de data,
   * e retorna o document chamando a função .save() do mongoose para salvar no banco de dados.
   */
  async create(data) {
    const document = new this.model(data);
    return document.save();
  }

  /**
   * O método findAll não recebe parâmetros,
   * chama a função .find() do mongoose diretamente em this.model
   * e retorna a lista com todos os documentos encontrados no banco de dados.
   */
  async findAll() {
    return this.model.find();
  }

  /**
   * O método findById recebe o ID do documento como parâmetro,
   * chama a função .findById(id) do mongoose de this.model
   * e retorna o documento correspondente caso ele exista.
   */
  async findById(id) {
    return this.model.findById(id);
  }

  /**
   * O método update recebe o ID do documento e um parâmetro data com os novos valores,
   * chama a função .findByIdAndUpdate do mongoose de this.model aplicando o operador $set com os novos dados,
   * passa a opção { new: true } para garantir o retorno do documento já atualizado,
   * e retorna o documento atualizado.
   */
  async update(id, data) {
    return this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  /**
   * O método delete recebe o ID do documento como parâmetro,
   * chama a função .findByIdAndDelete(id) do mongoose de this.model
   * e remove o documento do banco de dados, retornando o documento que foi excluído.
   */
  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
