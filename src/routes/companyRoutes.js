import express from "express";
import companyController from "../controllers/CompanyController.js";

/**
 * Instância do roteador do Express para gerenciamento de rotas de empresas.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /companies
 * @description Cria uma nova empresa no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da empresa).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna a empresa criada com status 201.
 */
routes.post("/companies", companyController.create);

/**
 * @route GET /companies
 * @description Retorna a lista de todas as empresas cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Lista de empresas com status 200.
 */
routes.get("/companies", companyController.getAll);

/**
 * @route GET /companies/:id
 * @description Busca e retorna uma empresa específica pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id` na URL.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Dados da empresa encontrada com status 200 ou erro se não localizada.
 */
routes.get("/companies/:id", companyController.getById);

/**
 * @route PUT /companies/:id
 * @description Atualiza os dados de uma empresa existente pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o ID nos parâmetros e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Empresa atualizada com status 200.
 */
routes.put("/companies/:id", companyController.update);

/**
 * @route DELETE /companies/:id
 * @description Remove uma empresa do sistema pelo ID.
 * @param {express.Request} req - Objeto de requisição contendo o parâmetro `id`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status 200.
 */
routes.delete("/companies/:id", companyController.delete);

export default routes;
