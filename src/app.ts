import accounts from "./routes/accounts";
import bodyParser = require("body-parser");

export const app = require("express")();

app.use(bodyParser.json());

app.use("/accounts", accounts);
