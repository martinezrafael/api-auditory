import express from "express";
import UserController from "../controllers/UserController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas do recurso de Usuários (`User`).
 *
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route GET /users/:id
 * @description Busca e retorna os dados de um usuário pelo seu ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Dados do usuário com status HTTP 200 ou erro 404.
 */
routes.get("/users/:id", UserController.getById);

/**
 * @route PUT /users/:id
 * @description Atualiza os dados de perfil de um usuário existente pelo seu ID.
 * @param {express.Request} req - Objeto de requisição contendo o ID nos parâmetros e os novos dados no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Usuário atualizado com status HTTP 200.
 */
routes.put("/users/:id", UserController.update);

export default routes;
