// color terminal
import chalk from "chalk";

// server
import express from "express";
const app = express();

// database
import connectToDatabase from "./database/config/database.js";
const database = await connectToDatabase();

database.on("error", (error) => {
  console.error(chalk.red(`Connection error:[database]: ${error}.`));
});

database.once("open", () => {
  console.log(
    chalk.bgGreenBright(`Connection successfully established: [database].`),
  );
});

/// routes
import routes from "./routes/index.js";
routes(app);

// error middleware
import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);

export default app;
