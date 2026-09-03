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

  async getById(id, populate = null, projection = null) {
    let query = this.model.findById(id, projection);

    if (populate) {
      query = query.populate(populate);
    }

    const document = await query;

    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }

  async update(id, data, options = {}) {
    const updateOptions = { new: true, runValidators: true, ...options };
    const document = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      updateOptions,
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
