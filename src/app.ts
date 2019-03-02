import accounts from "./routes/accounts";
import stores from "./routes/stores";
import items from "./routes/items";
import bodyParser = require("body-parser");
import cors = require("cors");
import { authMiddleware } from "./middleware/auth";

export const app = require("express")();

app.use(cors());

app.use(bodyParser.json());

app.use(authMiddleware);

app.use("/accounts", accounts);

app.use("/stores", stores);

app.use("/items", items);
