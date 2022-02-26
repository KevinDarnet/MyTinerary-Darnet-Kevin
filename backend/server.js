require("dotenv").config();
require("./config/database");
const cors = require("cors");
const Router = require("./routes/routes");
const express = require("express");

const PORT = 4000;

const app = express();

//middlewaers
app.use(cors());
app.use(express.json());
app.use("/api", Router);
app.listen(PORT, () => console.log("Server ready on PORT" + PORT));
