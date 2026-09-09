import BaseController from "./BaseController.js";
import userService from "../services/UserService.js";

class UserController extends BaseController {
  constructor() {
    super(userService, "Usuário");

    // GARANTIR O BIND DO 'this' CASO O MÉTODO SEJA PASSADO DIRETAMENTE PARA AS ROTAS DO EXPRESS
    this.adminCreate = this.adminCreate.bind(this);
  }

  /**
   * ENDPOINT EXCLUSIVO PARA A CRIAÇÃO DE NOVOS USUÁRIO VIA PERFIL ADMIN
   */
  async adminCreate(req, res, next) {
    try {
      const newUser = await userService.adminCreateUser(req.body, req.user);
      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
