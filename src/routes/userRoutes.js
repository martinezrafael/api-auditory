import express from "express";
import UserController from "../controllers/UserController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas do recurso de Usuários (`User`).
 *
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route GET /users
 * @description Retorna a lista de todos os usuários ativos cadastrados no sistema.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Lista de usuários com status HTTP 200.
 */
routes.get("/users", UserController.getAll);

/**
 * @route GET /users/:id
 * @description Busca e retorna os detalhes de um usuário específico pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Dados do usuário encontrado com status HTTP 200 ou erro 404 caso não localizado.
 */
routes.get("/users/:id", UserController.getById);

/**
 * @route PUT /users/:id
 * @description Atualiza os dados de um usuário existente pelo seu ID.
 * @param {express.Request} req - Objeto de requisição contendo o ID nos parâmetros e os novos dados no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Usuário atualizado com status HTTP 200.
 */
routes.put("/users/:id", UserController.update);

/**
 * @route DELETE /users/:id
 * @description Realiza a exclusão lógica (Soft Delete) de um usuário pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/users/:id", UserController.delete);

export default routes;
