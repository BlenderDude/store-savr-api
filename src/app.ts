import accounts from "./routes/accounts";

export const app = require("express")();

app.use("/accounts", accounts);
