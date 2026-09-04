import app from "./src/app.js";
import chalk from "chalk";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(chalk.bgMagenta(`Server running on port: ${PORT} [express]`));
});
