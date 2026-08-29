import mongoose from "mongoose";
import NotFoundError from "../errors/NotFoundError.js";

function errorHandler(error, req, res, next) {
  // Trata o nosso erro customizado de 404
  if (err instanceof NotFoundError) {
    return res.status(err.status).json({ message: err.message });
  }

  // Trata o CastError (ex: formato de ID inválido)
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Um ou mais dados fornecidos estão incorretos.",
    });
  }

  // Trata erros de validação do Schema
  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      message: "Erro de validação de dados.",
      errors: errorMessages,
    });
  }

  // Fallback: Erro genérico de servidor
  console.error(err);
  return res.status(500).json({
    message: "Erro interno de servidor.",
    error: err.message,
  });
}

export default errorHandler;
