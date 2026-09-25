import express from "express";
import SettlementController from "../controllers/SettlementController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Liquidações Financeiras (`Settlement`).
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /settlements
 * @description Cadastra um novo lote ou registro de liquidação financeira no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da liquidação).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da liquidação criada com status HTTP 201.
 */
routes.post("/settlements", SettlementController.create);

/**
 * @route GET /settlements
 * @description Retorna a lista de todas as liquidações financeiras cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de liquidações financeiras com status HTTP 200.
 */
routes.get("/settlements", SettlementController.getAll);

/**
 * @route GET /settlements/:id
 * @description Busca e retorna os dados de uma liquidação financeira específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da liquidação financeira localizada com status HTTP 200.
 */
routes.get("/settlements/:id", SettlementController.getById);

/**
 * @route PUT /settlements/:id
 * @description Atualiza as informações de uma liquidação financeira existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da liquidação financeira com status HTTP 200.
 */
routes.put("/settlements/:id", SettlementController.update);

/**
 * @route DELETE /settlements/:id
 * @description Remove o registro de uma liquidação financeira do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da liquidação a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/settlements/:id", SettlementController.delete);

export default routes;
