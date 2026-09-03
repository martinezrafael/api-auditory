import BaseRepository from "./BaseRepository.js";
import cardAcquirerModel from "../models/acquiring/CardAcquirer.js";

class CardAcquirerRepository extends BaseRepository {
  constructor() {
    super(cardAcquirerModel);
  }
}
export default new CardAcquirerRepository();
