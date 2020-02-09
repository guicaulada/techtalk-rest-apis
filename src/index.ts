import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import router from "./router";
const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(router);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
