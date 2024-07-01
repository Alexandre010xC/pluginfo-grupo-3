import { Request, Response } from "express"
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({message: "hello backend"});
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})