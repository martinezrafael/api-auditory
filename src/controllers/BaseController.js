class BaseController {
  // O construtor recebe uma instância do serviço e a armazena na propriedade this.service
  constructor(service) {
    this.service = service;
  }

  /**
   * O método create recebe os objetos da requisição (req), resposta (res) e próximo middleware (next),
   * extrai os dados do corpo da requisição (req.body) e os envia para this.service.create,
   * em caso de sucesso, retorna o status HTTP 201 (Created) com uma mensagem e o objeto criado em JSON,
   * em caso de erro, captura a exceção no bloco catch e a repassa para o middleware de tratamento com next(error).
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
   * O método getAll recebe os objetos da requisição (req), resposta (res) e próximo middleware (next),
   * chama this.service.getAll repassando os parâmetros de busca passados na URL (req.query),
   * em caso de sucesso, retorna o status HTTP 200 (OK) com a lista de itens obtida em formato JSON,
   * em caso de erro, captura a exceção no bloco catch e a repassa para o middleware de tratamento com next(error).
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
   * O método getById recebe os objetos da requisição (req), resposta (res) e próximo middleware (next),
   * extrai o ID enviado nos parâmetros de rota da URL (req.params.id) e o passa para this.service.getById,
   * em caso de sucesso, retorna o status HTTP 200 (OK) com o item retornado em formato JSON,
   * em caso de erro, captura a exceção no bloco catch e a repassa para o middleware de tratamento com next(error).
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
   * O método update recebe os objetos da requisição (req), resposta (res) e próximo middleware (next),
   * extrai o ID da URL (req.params.id) e os novos dados do corpo (req.body), repassando ambos para this.service.update,
   * em caso de sucesso, retorna o status HTTP 200 (OK) com uma mensagem e o objeto atualizado em formato JSON,
   * em caso de erro, captura a exceção no bloco catch e a repassa para o middleware de tratamento com next(error).
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
   * O método delete recebe os objetos da requisição (req), resposta (res) e próximo middleware (next),
   * extrai o ID da URL (req.params.id) e o envia para este ser removido em this.service.delete,
   * em caso de sucesso, retorna o status HTTP 200 (OK) confirmando a remoção do registro em formato JSON,
   * em caso de erro, captura a exceção no bloco catch e a repassa para o middleware de tratamento com next(error).
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
