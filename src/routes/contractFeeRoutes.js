import { Router } from "express";
import contractFeeController from "../controllers/ContractFeeController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Taxas Contratuais (`ContractFee`).
 * @type {import("express").Router}
 */
const router = Router();

router
  /**
   * @route GET /contract-fees
   * @description Retorna a lista de todas as taxas contratualmente negociadas e cadastradas.
   * @param {import("express").Request} req - Objeto de requisição do Express.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware para tratamento de erros.
   * @returns {Promise<void>} Lista de taxas contratuais com status HTTP 200.
   */
  .get("/contract-fees", contractFeeController.getAll)

  /**
   * @route GET /contract-fees/:id
   * @description Busca e retorna os detalhes de uma taxa contratual específica pelo ID.
   * @param {import("express").Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware para tratamento de erros.
   * @returns {Promise<void>} Registro da taxa contratual localizada com status HTTP 200.
   */
  .get("/contract-fees/:id", contractFeeController.getById)

  /**
   * @route POST /contract-fees
   * @description Cadastra uma nova taxa contratual no sistema.
   * @param {import("express").Request} req - Objeto de requisição contendo os dados da taxa no corpo (`req.body`).
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware para tratamento de erros.
   * @returns {Promise<void>} Registro da taxa contratual criada com status HTTP 201.
   */
  .post("/contract-fees", contractFeeController.create)

  /**
   * @route PUT /contract-fees/:id
   * @description Atualiza as informações de uma taxa contratual existente pelo ID.
   * @param {import("express").Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware para tratamento de erros.
   * @returns {Promise<void>} Registro atualizado com status HTTP 200.
   */
  .put("/contract-fees/:id", contractFeeController.update)

  /**
   * @route DELETE /contract-fees/:id
   * @description Remove o registro de uma taxa contratual do sistema pelo ID.
   * @param {import("express").Request} req - Requisição contendo o ID da taxa a ser excluída.
   * @param {import("express").Response} res - Objeto de resposta do Express.
   * @param {import("express").NextFunction} next - Função middleware para tratamento de erros.
   * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
   */
  .delete("/contract-fees/:id", contractFeeController.delete);

export default router;
