import express from "express";
import AuditController from "../controllers/AuditController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Auditoria.
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /audits
 * @description Registra um novo evento ou log de auditoria no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados do registro de auditoria).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados do registro de auditoria criado com status HTTP 201.
 */
routes.post("/audits", AuditController.create);

/**
 * @route GET /audits
 * @description Retorna a lista de todos os registros de auditoria cadastrados.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de logs de auditoria com status HTTP 200.
 */
routes.get("/audits", AuditController.getAll);

/**
 * @route GET /audits/:id
 * @description Busca e retorna um registro de auditoria específico pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro de auditoria localizado com status HTTP 200.
 */
routes.get("/audits/:id", AuditController.getById);

/**
 * @route PUT /audits/:id
 * @description Atualiza as informações de um registro de auditoria existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados do registro de auditoria com status HTTP 200.
 */
routes.put("/audits/:id", AuditController.update);

/**
 * @route DELETE /audits/:id
 * @description Remove um registro de auditoria do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID do registro a ser excluído.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/audits/:id", AuditController.delete);

export default routes;
