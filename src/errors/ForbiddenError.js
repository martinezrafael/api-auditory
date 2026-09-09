class ForbiddenError extends Error {
  constructor(message = "Acesso negado.") {
    super(message);
    this.name = "ForbiddenError";
    this.status = 403;
  }
}

export default ForbiddenError;
