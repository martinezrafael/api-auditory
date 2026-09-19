import BaseController from "./BaseController.js";
import userService from "../services/UserService.js";

class UserController extends BaseController {
  constructor() {
    super(userService);
  }
}

export default new UserController();
