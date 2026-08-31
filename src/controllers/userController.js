import NotFoundError from "../errors/NotFoundError.js";
import userModel from "../models/identity/User.js";

class userController {
  static createUser = async (req, res, next) => {
    try {
      const userCreated = new userModel(req.body);
      const userSaved = await userCreated.save();

      res.status(201).json({
        message: "Usuário criado com sucesso.",
        user: userSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllUsers = async (req, res, next) => {
    try {
      const allUsers = await userModel.find();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  };

  static getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);

      if (!user) {
        return next(new NotFoundError("Usuário não localizado."));
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const user = await userModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!user) {
        return next(new NotFoundError("Usuário não localizado"));
      }

      res.status(200).json({
        message: "Dados do usuário atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);

      if (!user) {
        return next(new NotFoundError("Usuário não localizado"));
      }

      res.status(200).json({
        message: "Dados do usuário deletados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default userController;
