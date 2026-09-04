class ConflictError extends Error {
  constructor(message = "Recurso já cadastrado.") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export default ConflictError;
