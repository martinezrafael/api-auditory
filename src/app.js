import express from "express";
import connectToDatabase from "./config/database.js";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const database = await connectToDatabase();

database.on("error", (error) => {
  console.error(`Erro de conexão: [database]: ${error}.`);
});

database.once("open", () => {
  console.log(`Conexão realizada com sucesso: [database].`);
});

const app = express();

routes(app);

app.use(errorHandler);

export default app;
