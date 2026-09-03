import BaseRepository from "./BaseRepository.js";
import documentModel from "../models/auditing/Document.js";

class DocumentRepository extends BaseRepository {
  constructor() {
    super(documentModel);
  }
}
export default new DocumentRepository();
