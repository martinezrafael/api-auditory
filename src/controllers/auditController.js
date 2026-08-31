import NotFoundError from "../errors/NotFoundError.js";
import auditModel from "../models/auditing/Audit.js";

class auditController {
  static createAudit = async (req, res, next) => {
    try {
      const auditCreated = new auditModel(req.body);
      const auditSaved = auditCreated.save();

      res.status(201).json({
        message: "Auditoria criada com sucesso.",
        audit: auditSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllAudits = async (req, res, next) => {
    try {
      const allAudits = await auditModel.find();
      res.stat(200).json(allAudits);
    } catch (error) {
      next(error);
    }
  };

  static getAuditById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const audit = await auditModel.findById(id);

      if (!audit) {
        return next(new NotFoundError("Auditoria não localizada."));
      }

      res.status(200).json(audit);
    } catch (error) {
      next(error);
    }
  };

  static updateAudit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const audit = await auditModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!audit) {
        return next(new NotFoundError("Auditoria não localizada."));
      }

      res.status(200).json({
        message: "Dados da auditoria atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteAudit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const audit = await auditModel.findByIdAndDelete(id);

      if (!audit) {
        return next(new NotFoundError("Auditoria não localizada."));
      }

      res.status(200).json({
        message: "Dados da auditoria deletados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default auditController;
