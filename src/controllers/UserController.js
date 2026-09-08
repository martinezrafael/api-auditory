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
      // LÊ O ID DO ADMIN A PARTIR DE UM HEADER
      const adminId = req.headers["x-admin-id"];

      // PAYLOAD COM OS DADOS DO NONO USUÁROP
      const payload = req.body;

      const newUser = await userService.adminCreateUser(payload, adminId);

      return res.status(201).json({
        message: "Usuário criado com sucesso pelo Administrador.",
        data: newUser,
      });
    } catch (error) {
      // SE A VALIDAÇÃO FALHAR (EX: NÃO FOR ADMIN), RETORNA 403 FORBIDDEN
      if (
        error.message.includes("Acesso negado") ||
        error.message.includes("criador")
      ) {
        return res.status(403).json({ message: error.message });
      }
      next(error);
    }
  }
}

export default new UserController();
