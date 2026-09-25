import express from "express";
import creditOfferController from "../controllers/CreditOfferController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Ofertas de Crédito.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * @route POST /credit-offers
 * @description Cadastra uma nova oferta de crédito no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados da oferta de crédito).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados da oferta de crédito criada com status HTTP 201.
 */
router.post("/credit-offers", creditOfferController.create);

/**
 * @route GET /credit-offers
 * @description Retorna a lista de todas as ofertas de crédito cadastradas.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de ofertas de crédito com status HTTP 200.
 */
router.get("/credit-offers", creditOfferController.getAll);

/**
 * @route GET /credit-offers/:id
 * @description Busca e retorna os dados de uma oferta de crédito específica pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro da oferta de crédito localizada com status HTTP 200.
 */
router.get("/credit-offers/:id", creditOfferController.getById);

/**
 * @route PUT /credit-offers/:id
 * @description Atualiza as informações de uma oferta de crédito existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados da oferta de crédito com status HTTP 200.
 */
router.put("/credit-offers/:id", creditOfferController.update);

/**
 * @route DELETE /credit-offers/:id
 * @description Remove o registro de uma oferta de crédito do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID da oferta de crédito a ser excluída.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
router.delete("/credit-offers/:id", creditOfferController.delete);

export default router;
