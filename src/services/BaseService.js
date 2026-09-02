import NotFoundError from "../errors/NotFoundError.js";

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }

  async getAll(filter = {}, projection = null, options = {}) {
    return await this.model.find(filter, projection, options);
  }

  async getById(id) {
    const document = await this.model.findById(id);
    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }

  async update(id, data) {
    const document = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }

  async delete(id) {
    const document = await this.model.findByIdAndDelete(id);
    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }
}

export default BaseService;
