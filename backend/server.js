require("dotenv").config();
require("./config/database");
const cors = require("cors");
const Router = require("./routes/routes");
const express = require("express");
const itinerariesRouter = require("./routes/itinerariesroutes");

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", Router);
app.use("/api", itinerariesRouter);
app.listen(PORT, () => console.log("Server ready on PORT" + PORT));
