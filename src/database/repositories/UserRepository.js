import BaseRepository from "./BaseRepository.js";
import userModel from "../models/UserModel.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(userModel);
  }
}
export default new UserRepository();
