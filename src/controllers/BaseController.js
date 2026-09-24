/**
 * Classe base genérica para controllers no padrão REST API.
 * Fornece métodos padrão de CRUD integrados ao serviço injetado.
 *
 * @class BaseController
 */
class BaseController {
  /**
   * Instancia o controller atribuindo a camada de serviço.
   *
   * @param {Object} service - Instância do serviço correspondente à entidade.
   */
  constructor(service) {
    /**
     * Instância do serviço para manipulação das regras de negócio.
     * @type {Object}
     */
    this.service = service;
  }

  /**
   * Cria um novo registro na base de dados.
   *
   * @param {Request} req - Objeto de requisição do Express contendo os dados no corpo (`req.body`).
   * @param {Response} res - Objeto de resposta do Express.
   * @param {NextFunction} next - Função middleware do Express para repasse de erros.
   * @returns {Promise<Response>} Resposta HTTP 201 com confirmação e os dados do recurso criado.
   * @throws Repassa o erro capturado para o middleware global de tratamento de erros.
   */
  create = async (req, res, next) => {
    try {
      const created = await this.service.create(req.body);
      return res.status(201).json({
        message: `Cadastrado(a) com sucesso.`,
        data: created,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtém a lista de registros com base nos parâmetros de consulta passados na URL.
   *
   * @param {Request} req - Objeto de requisição contendo query params (`req.query`).
   * @param {Response} res - Objeto de resposta do Express.
   * @param {NextFunction} next - Função middleware do Express para repasse de erros.
   * @returns {Promise<Response>} Resposta HTTP 200 com a coleção de registros.
   * @throws Repassa o erro capturado para o middleware global de tratamento de erros.
   */
  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll(req.query);
      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Busca um registro específico por seu identificador único.
   *
   * @param {Request} req - Objeto de requisição do Express com parâmetro de rota (`req.params.id`).
   * @param {Response} res - Objeto de resposta do Express.
   * @param {NextFunction} next - Função middleware do Express para repasse de erros.
   * @returns {Promise<Response>} Resposta HTTP 200 com o recurso localizado.
   * @throws Repassa o erro capturado para o middleware global de tratamento de erros.
   */
  getById = async (req, res, next) => {
    try {
      const item = await this.service.getById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Atualiza um registro existente identificado pelo ID enviado na URL.
   *
   * @param {Request} req - Requisição contendo o ID em `req.params.id` e as alterações em `req.body`.
   * @param {Response} res - Objeto de resposta do Express.
   * @param {NextFunction} next - Função middleware do Express para repasse de erros.
   * @returns {Promise<Response>} Resposta HTTP 200 com mensagem e os dados atualizados.
   * @throws Repassa o erro capturado para o middleware global de tratamento de erros.
   */
  update = async (req, res, next) => {
    try {
      const updated = await this.service.update(req.params.id, req.body);
      return res.status(200).json({
        message: `Atualizado(a) com sucesso.`,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove um registro do banco de dados pelo ID fornecido na URL.
   *
   * @param {Request} req - Requisição com o ID do registro em `req.params.id`.
   * @param {Response} res - Objeto de resposta do Express.
   * @param {NextFunction} next - Função middleware do Express para repasse de erros.
   * @returns {Promise<Response>} Resposta HTTP 200 com confirmação da exclusão.
   * @throws Repassa o erro capturado para o middleware global de tratamento de erros.
   */
  delete = async (req, res, next) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(200).json({
        message: `Removido(a) com sucesso.`,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;
