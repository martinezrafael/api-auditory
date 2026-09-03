import BaseService from "./BaseService.js";
import userRepository from "../repositories/UserRepository.js";

class UserService extends BaseService {
  constructor() {
    super(userRepository, [
      { path: "company", select: "legalName documentNumber" },
    ]);
  }
}
export default new UserService();
