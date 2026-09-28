import express from "express";
import connectToDatabase from "./database/config/database.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

/**
 * Instância principal da aplicação Express.
 * @type {express.Express}
 */
const app = express();

/**
 * Inicialização e conexão com o banco de dados MongoDB.
 */
await connectToDatabase();

// Registro das rotas da aplicação
routes(app);

// Middleware global de tratamento de erros registrado após todas as rotas
app.use(errorHandler);

/**
 * Exporta a instância configurada do Express para ser inicializada no servidor (HTTP server / server.js).
 * @exports app
 */
export default app;
