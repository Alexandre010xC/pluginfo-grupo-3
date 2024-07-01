const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.json({message: "hello backend"});
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

