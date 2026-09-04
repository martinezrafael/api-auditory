import BaseRepository from "./BaseRepository.js";
import auditModel from "../models/auditing/AuditModel.js";

class AuditRepository extends BaseRepository {
  constructor() {
    super(auditModel);
  }
}
export default new AuditRepository();
