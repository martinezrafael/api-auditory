class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }

  async findAll(filter = {}, populate = null, projection = null, options = {}) {
    let query = this.model.find(filter, projection, options);
    if (populate) query = query.populate(populate);
    return await query.exec();
  }

  async findById(id, populate = null, projection = null) {
    let query = this.model.findById(id, projection);
    if (populate) query = query.populate(populate);
    return await query.exec();
  }

  async update(id, data, options = {}) {
    const updateOptions = { new: true, runValidators: true, ...options };
    return await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      updateOptions,
    );
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async exists(filter) {
    return await this.model.exists(filter);
  }
}

export default BaseRepository;
