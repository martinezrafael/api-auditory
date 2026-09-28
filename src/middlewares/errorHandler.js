import mongoose from "mongoose";
import NotFoundError from "../errors/NotFoundError.js";

/**
 * Middleware global de tratamento de erros da aplicação Express.
 * Intercepta exceções lançadas nas rotas/controllers e formata respostas HTTP padronizadas.
 *
 * @param {Error} error - Objeto de erro capturado na cadeia de middlewares.
 * @param {import("express").Request} req - Objeto de requisição do Express.
 * @param {import("express").Response} res - Objeto de resposta do Express.
 * @param {import("express").NextFunction} next - Função middleware do Express para avançar na cadeia.
 * @returns {import("express").Response} Resposta HTTP formatada com código de status e mensagem correspondente.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  // 1. Trata exceções do tipo NotFoundError customizadas (HTTP 404)
  if (error instanceof NotFoundError) {
    return res.status(error.status || 404).json({ message: error.message });
  }

  // 2. Trata erros de conversão de tipos do Mongoose (ex: ID no formato inválido) (HTTP 400)
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Um ou mais dados fornecidos estão incorretos.",
    });
  }

  // 3. Trata erros de validação de esquemas do Mongoose (HTTP 400)
  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors).map((val) => val.message);
    return res.status(400).json({
      message: "Erro de validação de dados.",
      errors: errorMessages,
    });
  }

  // 4. Trata erros de duplicação do MongoDB (E11000 - unique constraint index) (HTTP 400/409)
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "campo";
    return res.status(400).json({
      message: `O valor informado para o campo '${field}' já está em uso no sistema.`,
    });
  }

  // 5. Trata erros de negócio com statusCode atribuído dinamicamente (ex: error.statusCode = 400)
  const statusCode = error.statusCode || error.status;
  if (statusCode && statusCode >= 400 && statusCode < 500) {
    return res.status(statusCode).json({
      message: error.message,
    });
  }

  // 6. Loga exceções inesperadas do servidor (HTTP 500)
  console.error("Uncaught Error:", error);

  return res.status(500).json({
    message: "Erro interno de servidor.",
    ...(process.env.NODE_ENV === "development" && { error: error.message }),
  });
}

export default errorHandler;
