import "dotenv/config";
import mongoose from "mongoose";

/**
 * URL de conexão com o banco de dados MongoDB obtida das variáveis de ambiente (`DB_URL`).
 * @type {string|undefined}
 */
const URL_CONNECTION = process.env.DB_URL;

/**
 * Estabelece a conexão assíncrona com o banco de dados MongoDB utilizando a biblioteca Mongoose.
 *
 * @async
 * @function connectToDatabase
 * @returns {Promise<mongoose.Connection>} Promessa que resolve para a instância da conexão do Mongoose (`mongoose.connection`).
 * @throws {Error} Lança um erro caso a string de conexão seja inválida ou a conexão falhe.
 */
async function connectToDatabase() {
  mongoose.connect(URL_CONNECTION);
  return mongoose.connection;
}

export default connectToDatabase;
