import express from "express";
import BankAccountController from "../controllers/BankAccountController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Contas Bancárias.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route GET /bank-accounts/:id
 * @description Busca e retorna os dados de uma conta bancária específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da conta bancária localizada com status HTTP 200.
 */
routes.get("/bank-accounts/:id", BankAccountController.getById);

/**
 * @route PUT /bank-accounts/:id
 * @description Atualiza as informações de uma conta bancária existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da conta bancária com status HTTP 200.
 */
routes.put("/bank-accounts/:id", BankAccountController.update);

export default routes;
