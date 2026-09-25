import express from "express";
import creditRequestController from "../controllers/CreditRequestController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Solicitações de Crédito.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * @route POST /credit-requests
 * @description Cadastra uma nova solicitação de crédito no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da solicitação).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da solicitação de crédito criada com status HTTP 201.
 */
router.post("/credit-requests", creditRequestController.create);

/**
 * @route GET /credit-requests
 * @description Retorna a lista de todas as solicitações de crédito cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de solicitações de crédito com status HTTP 200.
 */
router.get("/credit-requests", creditRequestController.getAll);

/**
 * @route GET /credit-requests/:id
 * @description Busca e retorna os dados de uma solicitação de crédito específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da solicitação de crédito localizada com status HTTP 200.
 */
router.get("/credit-requests/:id", creditRequestController.getById);

/**
 * @route PUT /credit-requests/:id
 * @description Atualiza as informações de uma solicitação de crédito existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da solicitação de crédito com status HTTP 200.
 */
router.put("/credit-requests/:id", creditRequestController.update);

/**
 * @route DELETE /credit-requests/:id
 * @description Remove o registro de uma solicitação de crédito do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da solicitação a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
router.delete("/credit-requests/:id", creditRequestController.delete);

export default router;
