import "dotenv/config";
import app from "./src/app.js";
import chalk from "chalk";

app.listen(process.env.PORT, () => {
  console.log(
    chalk.bgMagenta(`Server running on port: ${process.env.PORT} [express]`),
  );
});
