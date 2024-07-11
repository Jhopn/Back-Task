import express  from "express";
import { RouterTask } from "./routes/TaskRouter";
import { RouterUser } from "./routes/UserRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-Commerce Online!");
});

app.use(RouterTask);
app.use(RouterUser);


app.listen(4000, () => {
  console.log("Servidor E-Commerce Online!");
});