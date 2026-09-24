import express from "express";
import UserController from "../controllers/UserController.js";

/**
 * Instância do roteador do Express para gerenciamento de rotas de usuários.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /users
 * @description Cria um novo usuário no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados do usuário).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna o usuário criado com status 201.
 */
routes.post("/users", UserController.create);

/**
 * @route GET /users
 * @description Retorna a lista de todos os usuários cadastrados.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Lista de usuários com status 200.
 */
routes.get("/users", UserController.getAll);

/**
 * @route GET /users/:id
 * @description Busca e retorna um usuário específico pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL.
 * @param {express.Request.params} req.params - Parâmetros da rota.
 * @param {string} req.params.id - Identificador único do usuário.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Dados do usuário encontrado com status 200 ou erro se não localizado.
 */
routes.get("/users/:id", UserController.getById);

/**
 * @route PUT /users/:id
 * @description Atualiza os dados de um usuário existente pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o ID nos parâmetros e os novos dados no corpo.
 * @param {string} req.params.id - Identificador único do usuário a ser atualizado.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Usuário atualizado com status 200.
 */
routes.put("/users/:id", UserController.update);

/**
 * @route DELETE /users/:id
 * @description Remove um usuário do sistema pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id`.
 * @param {string} req.params.id - Identificador único do usuário a ser removido.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Confirmação da exclusão com status 200 ou 204.
 */
routes.delete("/users/:id", UserController.delete);

export default routes;
