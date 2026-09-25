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
function errorHandler(error, req, res, next) {
  // Trata exceções do tipo NotFoundError (HTTP 404)
  if (error instanceof NotFoundError) {
    return res.status(error.status).json({ message: error.message });
  }

  // Trata erros de conversão de tipos do Mongoose (ex: ID inválido em req.params) (HTTP 400)
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Um ou mais dados fornecidos estão incorretos.",
    });
  }

  // Trata erros de validação de esquemas do Mongoose (campos obrigatórios, enums, etc.) (HTTP 400)
  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors).map((val) => val.message);
    return res.status(400).json({
      message: "Erro de validação de dados.",
      errors: errorMessages,
    });
  }

  // Loga o erro não tratado e retorna erro interno do servidor (HTTP 500)
  console.error(error);
  return res.status(500).json({
    message: "Erro interno de servidor.",
    error: error.message,
  });
}

export default errorHandler;
