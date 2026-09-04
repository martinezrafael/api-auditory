import express from "express";
import connectToDatabase from "./config/database.js";
import chalk from "chalk";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const database = await connectToDatabase();

database.on("error", (error) => {
  console.error(chalk.red(`Connection error:[database]: ${error}.`));
});

database.once("open", () => {
  console.log(
    chalk.bgGreenBright(`Connection successfully established: [database].`),
  );
});

const app = express();

routes(app);

app.use(errorHandler);

export default app;
