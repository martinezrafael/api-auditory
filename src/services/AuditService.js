import BaseService from "./BaseService.js";
import AuditModel from "../models/auditing/Audit.js";

class AuditService extends BaseService {
  constructor() {
    super(AuditModel);
  }
}

export default new AuditService();
