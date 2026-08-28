import express from "express";
import connectToDatabase from "./config/database.js";

import routes from "./routes/index.js";

const database = await connectToDatabase();

database.on("error", (error) => {
  console.error(`Erro de conexão: [database]: ${error}.`);
});

database.once("open", () => {
  console.log(`Conexão realizada com sucesso: [database].`);
});

const app = express();

routes(app);

export default app;
