import BaseService from "./BaseService.js";
import auditRepository from "../repositories/AuditRepository.js";

class AuditService extends BaseService {
  constructor() {
    super(auditRepository, [
      { path: "company", select: "legalName documentNumber" },
      { path: "auditor", select: "fullName email role" },
    ]);
  }
}
export default new AuditService();
