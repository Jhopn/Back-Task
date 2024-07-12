import express  from "express";
import cors from 'cors'
import { RouterTask } from "./routes/TaskRouter";
import { RouterUser } from "./routes/UserRouter";
import { RouterAccess } from "./routes/AccessRouter";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("E-Commerce Online!");
});

app.use(RouterTask);
app.use(RouterUser);
app.use(RouterAccess)

app.listen(4000, () => {
  console.log("Servidor API Tasks Online!");
});