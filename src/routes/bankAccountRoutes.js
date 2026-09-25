import express from "express";
import BankAccountController from "../controllers/BankAccountController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Contas Bancárias.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /bank-accounts
 * @description Cadastra uma nova conta bancária no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da conta).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da conta bancária criada com status HTTP 201.
 */
routes.post("/bank-accounts", BankAccountController.create);

/**
 * @route GET /bank-accounts
 * @description Retorna a lista de todas as contas bancárias cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de contas bancárias com status HTTP 200.
 */
routes.get("/bank-accounts", BankAccountController.getAll);

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

/**
 * @route DELETE /bank-accounts/:id
 * @description Remove o registro de uma conta bancária do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da conta bancária a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/bank-accounts/:id", BankAccountController.delete);

export default routes;
