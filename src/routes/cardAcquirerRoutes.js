import express from "express";
import CardAcquirerController from "../controllers/CardAcquirerController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Adquirentes de Cartão.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /card-acquirers
 * @description Cadastra uma nova credenciadora/adquirente de cartão no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da adquirente).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da adquirente criada com status HTTP 201.
 */
routes.post("/card-acquirers", CardAcquirerController.create);

/**
 * @route GET /card-acquirers
 * @description Retorna a lista de todas as adquirentes de cartão cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de adquirentes com status HTTP 200.
 */
routes.get("/card-acquirers", CardAcquirerController.getAll);

/**
 * @route GET /card-acquirers/:id
 * @description Busca e retorna os dados de uma adquirente de cartão específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da adquirente localizada com status HTTP 200.
 */
routes.get("/card-acquirers/:id", CardAcquirerController.getById);

/**
 * @route PUT /card-acquirers/:id
 * @description Atualiza as informações de uma adquirente de cartão existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da adquirente com status HTTP 200.
 */
routes.put("/card-acquirers/:id", CardAcquirerController.update);

/**
 * @route DELETE /card-acquirers/:id
 * @description Remove o registro de uma adquirente de cartão do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da adquirente a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/card-acquirers/:id", CardAcquirerController.delete);

export default routes;
