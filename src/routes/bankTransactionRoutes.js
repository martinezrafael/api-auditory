import express from "express";
import BankTransactionController from "../controllers/BankTransactionController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Transações Bancárias.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /bank-transactions
 * @description Registra uma nova transação bancária no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da transação bancária).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da transação bancária criada com status HTTP 201.
 */
routes.post("/bank-transactions", BankTransactionController.create);

/**
 * @route GET /bank-transactions
 * @description Retorna a lista de todas as transações bancárias cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de transações bancárias com status HTTP 200.
 */
routes.get("/bank-transactions", BankTransactionController.getAll);

/**
 * @route GET /bank-transactions/:id
 * @description Busca e retorna os dados de uma transação bancária específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da transação bancária localizada com status HTTP 200.
 */
routes.get("/bank-transactions/:id", BankTransactionController.getById);

/**
 * @route PUT /bank-transactions/:id
 * @description Atualiza as informações de uma transação bancária existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da transação bancária com status HTTP 200.
 */
routes.put("/bank-transactions/:id", BankTransactionController.update);

/**
 * @route DELETE /bank-transactions/:id
 * @description Remove o registro de uma transação bancária do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da transação bancária a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/bank-transactions/:id", BankTransactionController.delete);

export default routes;
