import auditService from "../services/AuditService.js";

class AuditController {
  static createAudit = async (req, res) => {
    const auditSaved = await auditService.create(req.body);
    res.status(201).json({
      message: "Auditoria cadastrada com sucesso.",
      audit: auditSaved,
    });
  };

  static getAllAudits = async (req, res) => {
    const allAudits = await auditService.getAll();
    res.status(200).json(allAudits);
  };

  static getAuditById = async (req, res) => {
    const audit = await auditService.getById(req.params.id);
    res.status(200).json(audit);
  };

  static updateAudit = async (req, res) => {
    const auditUpdated = await auditService.update(req.params.id, req.body);
    res.status(200).json({
      message: "Dados da auditoria atualizados com sucesso.",
      audit: auditUpdated,
    });
  };

  static deleteAudit = async (req, res) => {
    await auditService.delete(req.params.id);
    res.status(200).json({
      message: "Auditoria removida com sucesso.",
    });
  };
}

export default AuditController;
