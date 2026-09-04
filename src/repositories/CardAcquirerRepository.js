import BaseRepository from "./BaseRepository.js";
import cardAcquirerModel from "../models/acquiring/CardAcquirerModel.js";

class CardAcquirerRepository extends BaseRepository {
  constructor() {
    super(cardAcquirerModel);
  }
}
export default new CardAcquirerRepository();
