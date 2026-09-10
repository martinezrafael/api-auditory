import { can } from "../services/authGuard.js";

/**
 * Middleware de autorização de rota.
 * Deve ser usado sempre depois de identifyUser (precisa de req.user já populado).
 *
 * @param {string} action - chave de PERMISSIONS
 * @param {(req) => object} [getContext] - extrai o contexto de escopo da requisição
 */
function authorizeMiddleware(action, getContext = () => ({})) {
  return (req, res, next) => {
    // EXTRAI O CONTEXTO DA REQUISIÇÃO E ARMAZENA EM const context
    const context = getContext(req);

    /*
      1. Pergunta pra can(): "esse usuário pode fazer essa ação nesse contexto?"
      2. Se a resposta for "não" (false):
        → responde 403 imediatamente, com mensagem explicando o papel do usuário e a ação negada
        → interrompe a requisição (return impede next())
      3. Se a resposta for "sim" (true):
      → o if nem executa, o código segue para next() (fora desse trecho)
   */
    if (!can(req.user, action, context)) {
      return res.status(403).json({
        message: `Acesso negado: seu papel (${req.user?.role ?? "undefined"}) não permite executar '${action}'.`,
      });
    }

    next();
  };
}

export default authorizeMiddleware;
