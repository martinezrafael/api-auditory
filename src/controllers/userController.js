import UserService from "../services/UserService.js";

class UserController {
  static createUser = async (req, res) => {
    const user = await UserService.create(req.body);
    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: user,
    });
  };

  static getAllUsers = async (req, res) => {
    const allUsers = await UserService.getAll();
    res.status(200).json(allUsers);
  };

  static getUserById = async (req, res) => {
    const user = await UserService.getById(req.params.id);
    res.status(200).json(user);
  };

  static updateUser = async (req, res) => {
    const user = await UserService.update(req.params.id, req.body);
    res.status(200).json({
      message: "Dados do usuário atualizados com sucesso.",
      user: user,
    });
  };

  static deleteUser = async (req, res) => {
    await UserService.delete(req.params.id);
    res.status(200).json({
      message: "Dados do usuário deletados com sucesso.",
    });
  };
}

export default UserController;
