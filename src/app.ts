import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import router from "./router";
const app = express();
const port = 5000;
import path from "path";
import bodyParser from "body-parser";

//* parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//* parse application/json
app.use(bodyParser.json());

app.use(express.static("src/public"));

//* Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//* Set router
app.use("/", router());

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
