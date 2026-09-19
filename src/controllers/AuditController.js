import BaseController from "./BaseController.js";
import auditService from "../services/AuditService.js";

class AuditController extends BaseController {
  constructor() {
    super(auditService);
  }
}
export default new AuditController();
