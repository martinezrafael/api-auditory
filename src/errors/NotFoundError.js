/**
 * Classe de erro customizada para representar recursos não encontrados no sistema (HTTP 404).
 * Herda da classe nativa `Error` do JavaScript.
 *
 * @class NotFoundError
 * @extends {Error}
 */
class NotFoundError extends Error {
  /**
   * Cria uma instância de `NotFoundError`.
   *
   * @param {string} [message="Não Encontrada."] - Mensagem explicativa do erro de recurso não localizado.
   */
  constructor(message = "Não Encontrada.") {
    super(message);
    /**
     * Nome do erro customizado.
     * @type {string}
     */
    this.name = "NotFoundError";
    /**
     * Código de status HTTP associado ao erro (404 Not Found).
     * @type {number}
     */
    this.status = 404;
  }
}

export default NotFoundError;
