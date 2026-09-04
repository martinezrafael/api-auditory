import BaseRepository from "./BaseRepository.js";
import userModel from "../models/identity/UserModel.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(userModel);
  }
}
export default new UserRepository();
