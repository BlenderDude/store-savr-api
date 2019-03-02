import accounts from "./routes/accounts";
import bodyParser = require("body-parser");
import cors = require("cors");
import { authMiddleware } from "./middleware/auth";

export const app = require("express")();

app.use(cors());

app.use(bodyParser.json());

app.use(authMiddleware);

app.use("/accounts", accounts);
