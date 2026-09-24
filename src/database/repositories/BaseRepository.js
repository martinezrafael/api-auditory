import mongoose from "mongoose";

/**
 * Repositório base genérico para realizar operações de persistência no MongoDB utilizando o Mongoose.
 *
 * @class BaseRepository
 */
class BaseRepository {
  /**
   * Instancia o repositório atribuindo o modelo do Mongoose.
   *
   * @param {mongoose.Model} model - Modelo do Mongoose que será manipulado pelo repositório.
   */
  constructor(model) {
    /**
     * Modelo do Mongoose associado a esta instância do repositório.
     * @type {mongoose.Model}
     */
    this.model = model;
  }

  /**
   * Instancia e salva um novo documento no banco de dados.
   *
   * @param {Object} data - Objeto contendo os dados do documento a ser inserido.
   * @returns {Promise<mongoose.Document>} Promessa que resolve para o documento criado e salvo.
   */
  async create(data) {
    const document = new this.model(data);
    return document.save();
  }

  /**
   * Retorna todos os documentos da coleção associada.
   *
   * @returns {Promise<Array<mongoose.Document>>} Promessa que resolve para a lista de documentos encontrados.
   */
  async findAll() {
    return this.model.find();
  }

  /**
   * Busca um único documento pelo seu ID único de registro (`_id`).
   *
   * @param {string|mongoose.Types.ObjectId} id - O ID do documento a ser pesquisado.
   * @returns {Promise<mongoose.Document|null>} Promessa que resolve para o documento localizado ou `null`.
   */
  async findById(id) {
    return this.model.findById(id);
  }

  /**
   * Atualiza os campos de um documento existente identificando-o pelo ID.
   *
   * @param {string|mongoose.Types.ObjectId} id - O ID do documento a ser atualizado.
   * @param {Object} data - Objeto contendo os novos dados a serem aplicados via operador `$set`.
   * @returns {Promise<mongoose.Document|null>} Promessa que resolve para o documento já atualizado (`new: true`).
   */
  async update(id, data) {
    return this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  /**
   * Remove um documento do banco de dados pelo seu ID.
   *
   * @param {string|mongoose.Types.ObjectId} id - O ID do documento a ser deletado.
   * @returns {Promise<mongoose.Document|null>} Promessa que resolve para o documento que foi excluído.
   */
  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
