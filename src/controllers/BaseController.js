class BaseController {
  constructor(service, entityName = "Recurso") {
    this.service = service;
    this.entityName = entityName;
  }

  create = async (req, res, next) => {
    try {
      const created = await this.service.create(req.body);
      return res.status(201).json({
        message: `${this.entityName} cadastrado(a) com sucesso.`,
        data: created,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll(req.query);
      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const item = await this.service.getById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const updated = await this.service.update(req.params.id, req.body);
      return res.status(200).json({
        message: `${this.entityName} atualizado(a) com sucesso.`,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(200).json({
        message: `${this.entityName} removido(a) com sucesso.`,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;
