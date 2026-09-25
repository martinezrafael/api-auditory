import express from "express";
import DocumentController from "../controllers/DocumentController.js";

/**
 * Instância do roteador do Express para gerenciamento das rotas de Documentos (`Document`).
 * @type {express.Router}
 */
const routes = express.Router();

/**
 * @route POST /documents
 * @description Cadastra um novo documento no sistema.
 * @param {express.Request} req - Objeto de requisição do Express (contém o corpo com os dados do documento).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados do documento criado com status HTTP 201.
 */
routes.post("/documents", DocumentController.create);

/**
 * @route GET /documents
 * @description Retorna a lista de todos os documentos cadastrados.
 * @param {express.Request} req - Objeto de requisição do Express.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Lista de documentos com status HTTP 200.
 */
routes.get("/documents", DocumentController.getAll);

/**
 * @route GET /documents/:id
 * @description Busca e retorna os dados de um documento específico pelo ID.
 * @param {express.Request} req - Requisição contendo o ID nos parâmetros da URL (`req.params.id`).
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Registro do documento localizado com status HTTP 200.
 */
routes.get("/documents/:id", DocumentController.getById);

/**
 * @route PUT /documents/:id
 * @description Atualiza as informações de um documento existente pelo ID.
 * @param {express.Request} req - Requisição contendo o ID na URL e os novos dados no corpo.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Dados atualizados do documento com status HTTP 200.
 */
routes.put("/documents/:id", DocumentController.update);

/**
 * @route DELETE /documents/:id
 * @description Remove o registro de um documento do sistema pelo ID.
 * @param {express.Request} req - Requisição contendo o ID do documento a ser excluído.
 * @param {express.Response} res - Objeto de resposta do Express.
 * @param {express.NextFunction} next - Função middleware para tratamento de erros.
 * @returns {Promise<void>} Confirmação da exclusão com status HTTP 200.
 */
routes.delete("/documents/:id", DocumentController.delete);

export default routes;
