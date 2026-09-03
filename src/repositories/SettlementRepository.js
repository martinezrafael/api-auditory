import BaseRepository from "./BaseRepository.js";
import settlementModel from "../models/acquiring/Settlement.js";

class SettlementRepository extends BaseRepository {
  constructor() {
    super(settlementModel);
  }
}
export default new SettlementRepository();
