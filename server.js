import "dotenv/config";
import app from "./src/app.js";
import chalk from "chalk";

/**
 * Porta de execução do servidor HTTP, obtida das variáveis de ambiente.
 * @type {number|string}
 */
const PORT = process.env.PORT;

/**
 * Inicializa o servidor HTTP do Express ouvindo a porta configurada no ambiente.
 * Exibe no terminal uma mensagem de confirmação formatada com fundo magenta via Chalk.
 */
app.listen(PORT, () => {
  console.log(chalk.bgMagenta(`Server running on port: ${PORT} [express]`));
});
