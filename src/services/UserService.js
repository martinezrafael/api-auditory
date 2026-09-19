import BaseService from "./BaseService.js";
import userRepository from "../database/repositories/UserRepository.js";

class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }
}

export default new UserService();
