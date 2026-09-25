// color terminal
import chalk from "chalk";

// server
import express from "express";

// database
import connectToDatabase from "./database/config/database.js";

// routes
import routes from "./routes/index.js";

// error middleware
import errorHandler from "./middlewares/errorHandler.js";

/**
 * Instância principal da aplicação Express.
 * @type {express.Express}
 */
const app = express();

/**
 * Inicialização e monitoramento da conexão com o banco de dados MongoDB.
 * Estabelece a conexão assíncrona e registra os ouvintes de eventos da instância.
 */
const database = await connectToDatabase();

/**
 * Listener acionado em caso de erro na conexão com o banco de dados.
 * Loga a mensagem de erro formatada no terminal em tom vermelho.
 */
database.on("error", (error) => {
  console.error(chalk.red(`Connection error:[database]: ${error}.`));
});

/**
 * Listener acionado uma única vez quando a conexão com o banco de dados é estabelecida com sucesso.
 * Loga a confirmação formatada com fundo verde brilhante no terminal.
 */
database.once("open", () => {
  console.log(
    chalk.bgGreenBright(`Connection successfully established: [database].`),
  );
});

// Registro das rotas da aplicação e inclusão do middleware de parse JSON
routes(app);

// Registrar o middleware global de tratamento de erros após a definição de todas as rotas
app.use(errorHandler);

/**
 * Exporta a instância configurada do Express para ser inicializada no servidor (HTTP server / server.js).
 * @exports app
 */
export default app;
