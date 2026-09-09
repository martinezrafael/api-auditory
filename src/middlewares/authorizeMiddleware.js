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
    const context = getContext(req);

    if (!can(req.user, action, context)) {
      return res.status(403).json({
        message: `Acesso negado: seu papel (${req.user?.role ?? "undefined"}) não permite executar '${action}'.`,
      });
    }

    next();
  };
}

export default authorizeMiddleware;
