import BaseService from "./BaseService.js";
import UserModel from "../models/identity/User.js";

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }
}

export default new UserService();
