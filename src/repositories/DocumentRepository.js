import BaseRepository from "./BaseRepository.js";
import documentModel from "../models/auditing/DocumentModel.js";

class DocumentRepository extends BaseRepository {
  constructor() {
    super(documentModel);
  }
}
export default new DocumentRepository();
