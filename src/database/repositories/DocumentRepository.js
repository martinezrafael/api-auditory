import BaseRepository from "./BaseRepository.js";
import documentModel from "../models/DocumentModel.js";

class DocumentRepository extends BaseRepository {
  constructor() {
    super(documentModel);
  }
}
export default new DocumentRepository();
