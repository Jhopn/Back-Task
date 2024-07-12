import express  from "express";
import { RouterTask } from "./routes/TaskRouter";
import { RouterUser } from "./routes/UserRouter";
import { RouterAccess } from "./routes/AccessRouter";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Tasks Online!");
});

app.use(RouterTask);
app.use(RouterUser);
app.use(RouterAccess)

app.listen(4000, () => {
  console.log("Servidor API Tasks Online!");
});