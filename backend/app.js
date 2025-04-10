import express from 'express'
import router from "./route.js";

const app = express();
const port = 3001;

app.use(express.json())
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });