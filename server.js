import "dotenv/config";
import app from "./src/app.js";
import connectToDatabase from "./src/database/config/database.js";
import chalk from "chalk";

/**
 * Porta de execução do servidor HTTP obtida do ambiente ou fallback para 3000.
 * @type {number|string}
 */
const PORT = process.env.PORT || 3000;

/**
 * Inicializa a aplicação estabelecendo a conexão com o banco de dados
 * e, em seguida, subindo o servidor HTTP do Express.
 */
async function startServer() {
  try {
    // Inicializa a conexão com o banco de dados
    const connection = await connectToDatabase();

    connection.on("error", (erro) => {
      console.error(
        chalk.bgRed("[Database] Erro de conexão com o banco de dados:"),
        erro,
      );
    });

    connection.once("open", () => {
      console.log(
        chalk.bgGreen.black(
          "[Database] Conexão com o banco de dados estabelecida com sucesso! ",
        ),
      );
    });

    // Inicializa o servidor HTTP do Express
    const server = app.listen(PORT, () => {
      console.log(
        chalk.bgMagenta.black(`[express] Servidor rodando na porta: ${PORT}.`),
      );
    });

    // Trata o encerramento gracioso (Graceful Shutdown)
    const gracefulShutdown = (signal) => {
      console.log(
        chalk.yellow(
          `\n[express] Recebido sinal ${signal}. Encerrando servidor HTTP...`,
        ),
      );
      server.close(() => {
        console.log(
          chalk.red(
            "[express] Servidor HTTP encerrado. Fechando conexão com o banco...",
          ),
        );
        connection.close(false, () => {
          console.log(
            chalk.gray(
              "[express] Conexão com o banco fechada. Processo finalizado com sucesso.",
            ),
          );
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error(
      chalk.bgRed.white(" [app] Falha crítica ao inicializar a aplicação: "),
      error,
    );
    process.exit(1);
  }
}

startServer();
