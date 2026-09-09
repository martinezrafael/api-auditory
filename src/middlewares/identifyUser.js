import UnauthorizedError from "../errors/UnauthorizedError.js";
import UserRepository from "../repositories/UserRepository.js";

/**
 * Resolve req.user a partir do header x-creator-id.
 * Fase de desenvolvimento/testes — ao adicionar autenticação via JWT,
 * este é o único arquivo que precisa ser reescrito (extrair o id do token
 * decodificado em vez do header).
 */
async function identifyUser(req, res, next) {
  try {
    const userId = req.headers["x-creator-id"];

    if (!userId) {
      throw new UnauthorizedError(
        "Cabeçalho 'x-creator-id' não foi informado.",
      );
    }

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError("Usuário informado não foi encontrado.");
    }

    if (!user.isActive) {
      throw new UnauthorizedError(
        "Usuário informado está inativo na plataforma.",
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default identifyUser;
