import express from "express";
import BankController from "../controllers/BankController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Bancos.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * ==========================================
 * ROTAS COMPOSTAS E SUB-RECURSOS (CONTAS BANCÁRIAS)
 * ==========================================
 */

/**
 * @route POST /banks/:bankId/bank-accounts
 * @description Associa e cadastra uma nova conta bancária a um banco existente.
 * @param {express.Request} req - Objeto de requisição contendo `bankId` em `req.params` e dados da conta em `req.body`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna os dados da conta bancária criada com status HTTP 201.
 */
routes.post("/banks/:bankId/bank-accounts", BankController.addAccountToBank);

/**
 * @route GET /banks/:bankId/bank-accounts
 * @description Retorna a lista de todas as contas bancárias vinculadas a um banco específico.
 * @param {express.Request} req - Objeto de requisição contendo `bankId` em `req.params`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Lista de contas bancárias com status HTTP 200.
 */
routes.get("/banks/:bankId/bank-accounts", BankController.getAccountsByBank);

/**
 * @route GET /banks/:bankId/bank-accounts/:accountId
 * @description Busca e retorna os dados de uma conta bancária específica vinculada a um banco.
 * @param {express.Request} req - Objeto de requisição contendo `bankId` e `accountId` em `req.params`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Dados da conta bancária com status HTTP 200 ou erro 404.
 */
routes.get(
  "/banks/:bankId/bank-accounts/:accountId",
  BankController.getAccountByBank,
);

export default routes;
