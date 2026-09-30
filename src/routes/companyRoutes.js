import express from "express";
import companyController from "../controllers/CompanyController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas do recurso de Empresas (`Company`).
 *
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * ==========================================
 * ROTAS COMPOSTAS E SUB-RECURSOS (BANCOS)
 * ==========================================
 */

/**
 * @route POST /companies/:companyId/banks
 * @description Associa e cadastra uma nova instituição bancária a uma empresa existente.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` em `req.params` e dados do banco em `req.body`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna os dados bancários cadastrados com status HTTP 201.
 */
routes.post("/companies/:companyId/banks", companyController.addBankToCompany);

/**
 * @route GET /companies/:companyId/banks
 * @description Retorna a lista de todas as instituições bancárias vinculadas a uma empresa específica.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` em `req.params`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Lista de bancos com status HTTP 200.
 */
routes.get("/companies/:companyId/banks", companyController.getBanksByCompany);

routes.get(
  "/companies/:companyId/banks/:bankId",
  companyController.getBankByCompany,
);

/**
 * ==========================================
 * ROTAS COMPOSTAS E SUB-RECURSOS (USUÁRIOS)
 * ==========================================
 */

/**
 * @route POST /companies/users
 * @description Cria uma empresa e um usuário administrador/inicial na mesma requisição de forma atômica (transacional).
 * @param {express.Request} req - Objeto de requisição contendo `companyData` e `userData` no corpo (`req.body`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna os documentos da empresa e do usuário criados com status HTTP 201.
 */
routes.post("/companies/users", companyController.createCompanyWithUser);

/**
 * @route POST /companies/:companyId/users
 * @description Associa e cadastra um novo usuário a uma empresa existente.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` em `req.params` e dados do novo usuário em `req.body`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Retorna o usuário cadastrado com status HTTP 201.
 */
routes.post("/companies/:companyId/users", companyController.addUserToCompany);

/**
 * @route GET /companies/:companyId/users
 * @description Retorna a lista de todos os usuários pertencentes a uma empresa específica.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` em `req.params`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Lista de usuários com status HTTP 200.
 */
routes.get("/companies/:companyId/users", companyController.getUsersByCompany);

/**
 * @route GET /companies/:companyId/users/:userId
 * @description Busca e retorna os dados de um usuário específico vinculado a uma empresa.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` e `userId` em `req.params`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Dados do usuário com status HTTP 200 ou erro 404.
 */
routes.get(
  "/companies/:companyId/users/:userId",
  companyController.getUserByCompany,
);

/**
 * @route PUT /companies/:companyId/users/:userId
 * @description Atualiza os dados de um usuário vinculado a uma empresa específica.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` e `userId` em `req.params` e os novos dados em `req.body`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Usuário atualizado com status HTTP 200.
 */
routes.put(
  "/companies/:companyId/users/:userId",
  companyController.updateUserByCompany,
);

/**
 * @route DELETE /companies/:companyId/users/:userId
 * @description Realiza a exclusão lógica (Soft Delete) de um usuário vinculado a uma empresa.
 * @param {express.Request} req - Objeto de requisição contendo `companyId` e `userId` em `req.params`.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware do Express para repasse de erros.
 * @returns {Promise<void>} Mensagem de confirmação de remoção com status HTTP 200.
 */
routes.delete(
  "/companies/:companyId/users/:userId",
  companyController.deleteUserByCompany,
);

/**
 * ==========================================
 * ROTAS PRINCIPAIS DA ENTIDADE (COMPANIES)
 * ==========================================
 */

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

export default routes;
