import mongoose from "mongoose";

/**
 * Repositório base genérico com suporte a Soft Delete.
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return document.save();
  }

  /**
   * Retorna apenas os documentos que NÃO foram marcados como deletados.
   */
  async findAll() {
    return this.model.find({ isDeleted: { $ne: true } });
  }

  /**
   * Busca um único documento pelo ID, desde que NÃO esteja deletado.
   */
  async findById(id) {
    return this.model.findOne({ _id: id, isDeleted: { $ne: true } });
  }

  /**
   * Atualiza os campos de um documento existente, desde que NÃO esteja deletado.
   */
  async update(id, data) {
    return this.model.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { $set: data },
      { new: true },
    );
  }

  /**
   * Executa o SOFT DELETE no registro alterando a flag 'isDeleted' e registrando 'deletedAt'.
   *
   * @param {string|mongoose.Types.ObjectId} id - O ID do documento a ser inativado.
   * @returns {Promise<mongoose.Document|null>} O documento com a flag de deleção atualizada.
   */
  async delete(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
      { new: true },
    );
  }
}

export default BaseRepository;
