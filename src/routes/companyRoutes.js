import express from "express";
import companyController from "../controllers/CompanyController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas do recurso de Empresas (`Company`).
 *
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /companies
 * @description Cria uma nova empresa simples no sistema.
 * @param {express.Request} req - Objeto de requisição contendo os dados da empresa no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna a empresa criada com status HTTP 201.
 */
routes.post("/companies", companyController.create);

/**
 * @route POST /companies/with-user
 * @description Cria uma empresa e um usuário administrador/inicial na mesma requisição de forma atômica (transacional).
 * @param {express.Request} req - Objeto de requisição contendo `companyData` e `userData` no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna os documentos da empresa e do usuário criados com status HTTP 201.
 */
routes.post("/companies/with-user", companyController.createWithUser);

/**
 * @route POST /companies/:id/users
 * @description Associa e cadastra um novo usuário a uma empresa existente.
 * @param {express.Request} req - Objeto de requisição contendo o ID da empresa em `req.params.id` e os dados do novo usuário no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna o usuário cadastrado com status HTTP 201.
 */
routes.post("/companies/:id/users", companyController.addUser);

/**
 * @route GET /companies
 * @description Retorna a lista de todas as empresas ativas cadastradas com os dados de usuários populados.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Lista de empresas com status HTTP 200.
 */
routes.get("/companies", companyController.getAll);

/**
 * @route GET /companies/:id
 * @description Busca e retorna os detalhes de uma empresa específica pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Dados da empresa encontrada com status HTTP 200 ou erro 404 caso não localizada.
 */
routes.get("/companies/:id", companyController.getById);

/**
 * @route PUT /companies/:id
 * @description Atualiza os dados de uma empresa existente pelo seu ID.
 * @param {express.Request} req - Objeto de requisição contendo o ID nos parâmetros da URL e os novos dados no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Empresa atualizada com status HTTP 200.
 */
routes.put("/companies/:id", companyController.update);

/**
 * @route DELETE /companies/:id
 * @description Realiza a exclusão (Soft Delete) de uma empresa pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Mensagem de confirmação de exclusão com status HTTP 200.
 */
routes.delete("/companies/:id", companyController.delete);

export default routes;
