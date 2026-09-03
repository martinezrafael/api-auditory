import BaseService from "./BaseService.js";
import documentRepository from "../repositories/DocumentRepository.js";

class DocumentService extends BaseService {
  constructor() {
    super(documentRepository, [
      { path: "company", select: "legalName documentNumber" },
      { path: "audit", select: "scheduleDate status" },
    ]);
  }
}
export default new DocumentService();
