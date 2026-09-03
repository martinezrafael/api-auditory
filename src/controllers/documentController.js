import BaseController from "./BaseController.js";
import documentService from "../services/DocumentService.js";

class DocumentController extends BaseController {
  constructor() {
    super(documentService, "Documento");
  }
}
export default new DocumentController();
