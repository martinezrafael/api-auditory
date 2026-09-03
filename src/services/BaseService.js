import NotFoundError from "../errors/NotFoundError.js";

class BaseService {
  constructor(repository, defaultPopulate = null) {
    this.repository = repository;
    this.defaultPopulate = defaultPopulate;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async getAll(filter = {}) {
    return await this.repository.findAll(filter, this.defaultPopulate);
  }

  async getById(id) {
    const document = await this.repository.findById(id, this.defaultPopulate);
    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }

  async update(id, data) {
    const document = await this.repository.update(id, data);
    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }

  async delete(id) {
    const document = await this.repository.delete(id);
    if (!document) {
      throw new NotFoundError("Recurso não localizado.");
    }
    return document;
  }
}

export default BaseService;
