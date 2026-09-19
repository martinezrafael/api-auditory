import BaseService from "./BaseService.js";
import documentRepository from "../database/repositories/DocumentRepository.js";

class DocumentService extends BaseService {
  constructor() {
    super(documentRepository);
  }
}
export default new DocumentService();
