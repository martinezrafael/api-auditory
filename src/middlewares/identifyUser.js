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
    // extrai a informação de x-creator-id do cabeçalho da requisição e armazena na const userId
    const userId = req.headers["x-creator-id"];

    // se não encontrar o valor de x-creator-id no header, retorna um erro
    if (!userId) {
      throw new UnauthorizedError(
        "Cabeçalho 'x-creator-id' não foi informado.",
      );
    }

    // senão, usa o valor extraído para buscar o usuário no banco
    // com o método findById do UserRepository que estende de BaseRepository
    const user = await UserRepository.findById(userId);

    // se não encontrar o usuário no banco, retorna um erro
    if (!user) {
      throw new UnauthorizedError("Usuário informado não foi encontrado.");
    }

    // se o usuário é localizado no banco
    // verifica de a chave isActive é false e retorna um erro
    if (!user.isActive) {
      throw new UnauthorizedError(
        "Usuário informado está inativo na plataforma.",
      );
    }

    // atribui o valor de user para req.user
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default identifyUser;
