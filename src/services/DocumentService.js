import BaseService from "./BaseService.js";
import documentModel from "../models/auditing/Document.js";

class DocumentService extends BaseService {
  constructor() {
    super(documentModel);
  }
}

export default new DocumentService();
