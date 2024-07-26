import express  from "express";
import cors from "cors";
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger-output.json');

import { RouterTask } from "./routes/TaskRouter";
import { RouterUser } from "./routes/UserRouter";
import { RouterAccess } from "./routes/AccessRouter";


const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: '*'
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res) => {
  res.send("Tasks Online!");
});

app.use(RouterTask);
app.use(RouterUser);
app.use(RouterAccess)

app.listen(4000, () => {
  console.log("Servidor API Tasks Online!");
});
