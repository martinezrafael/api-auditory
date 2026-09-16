import BaseService from "./BaseService.js";
import auditRepository from "../repositories/AuditRepository.js";

class AuditService extends BaseService {
  constructor() {
    super(auditRepository);
  }
}
export default new AuditService();
