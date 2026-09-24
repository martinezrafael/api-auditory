import express from "express";
import BankController from "../controllers/BankController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Bancos.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /banks
 * @description Cadastra uma nova instituição bancária no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados do banco).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados do banco criado com status HTTP 201.
 */
routes.post("/banks", BankController.create);

/**
 * @route GET /banks
 * @description Retorna a lista de todas as instituições bancárias cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de bancos com status HTTP 200.
 */
routes.get("/banks", BankController.getAll);

/**
 * @route GET /banks/:id
 * @description Busca e retorna os dados de um banco específico pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro do banco localizado com status HTTP 200.
 */
routes.get("/banks/:id", BankController.getById);

/**
 * @route PUT /banks/:id
 * @description Atualiza as informações de um banco existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados do banco com status HTTP 200.
 */
routes.put("/banks/:id", BankController.update);

/**
 * @route DELETE /banks/:id
 * @description Remove o registro de um banco do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID do banco a ser excluído.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/banks/:id", BankController.delete);

export default routes;
