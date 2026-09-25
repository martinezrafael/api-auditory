import express from "express";
import CardTransactionController from "../controllers/CardTransactionController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Transações de Cartão.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /card-transactions
 * @description Registra uma nova transação de cartão no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da transação de cartão).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da transação de cartão criada com status HTTP 201.
 */
routes.post("/card-transactions", CardTransactionController.create);

/**
 * @route GET /card-transactions
 * @description Retorna a lista de todas as transações de cartão cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de transações de cartão com status HTTP 200.
 */
routes.get("/card-transactions", CardTransactionController.getAll);

/**
 * @route GET /card-transactions/:id
 * @description Busca e retorna os dados de uma transação de cartão específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da transação de cartão localizada com status HTTP 200.
 */
routes.get("/card-transactions/:id", CardTransactionController.getById);

/**
 * @route PUT /card-transactions/:id
 * @description Atualiza as informações de uma transação de cartão existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da transação de cartão com status HTTP 200.
 */
routes.put("/card-transactions/:id", CardTransactionController.update);

/**
 * @route DELETE /card-transactions/:id
 * @description Remove o registro de uma transação de cartão do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da transação de cartão a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/card-transactions/:id", CardTransactionController.delete);

export default routes;
