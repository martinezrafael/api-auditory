class UnauthorizedError extends Error {
  constructor(message = "Usuário não autenticado.") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

export default UnauthorizedError;
