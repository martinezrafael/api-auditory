import BaseRepository from "./BaseRepository.js";
import settlementModel from "../models/acquiring/SettlementModel.js";

class SettlementRepository extends BaseRepository {
  constructor() {
    super(settlementModel);
  }
}
export default new SettlementRepository();
