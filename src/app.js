import express from "express";
import connectToDatabase from "./config/database.js";

const database = await connectToDatabase();

database.on("error", (error) => {
  console.error(`Erro de conexão: [database]: ${error}.`);
});

database.once("open", () => {
  console.log(`Conexão realizada com sucesso: [database].`);
});

const app = express();

app.use(express.json());

export default app;
