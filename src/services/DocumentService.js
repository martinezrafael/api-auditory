import BaseService from "./BaseService.js";
import documentRepository from "../repositories/DocumentRepository.js";

class DocumentService extends BaseService {
  constructor() {
    super(documentRepository);
  }
}
export default new DocumentService();
